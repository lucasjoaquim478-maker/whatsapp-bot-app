const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let botProcess = null;

log.transports.file.level = 'info';
log.transports.console.level = 'info';

autoUpdater.logger = log;
autoUpdater.autoDownload = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { preload: path.join(__dirname, 'preload.js') },
        title: 'WhatsApp Bot',
        backgroundColor: '#1a1a2e'
    });

    mainWindow.loadFile('renderer/index.html');

    mainWindow.on('closed', () => { mainWindow = null; });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('log', '🤖 App iniciada! Aguardando...\n');
        checkForUpdates();
    });
}

function checkForUpdates() {
    autoUpdater.checkForUpdates().catch(err => {
        mainWindow?.webContents.send('log', `Erro ao verificar updates: ${err.message}\n`);
    });
}

autoUpdater.on('update-available', (info) => {
    mainWindow?.webContents.send('log', `📦 Update disponível: ${info.version}\n`);
    mainWindow?.webContents.send('log', 'Baixando update...\n');
    autoUpdater.downloadUpdate();
});

autoUpdater.on('update-downloaded', () => {
    mainWindow?.webContents.send('log', '✅ Update baixado! Reiniciando...\n');
    autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (err) => {
    mainWindow?.webContents.send('log', `Erro: ${err.message}\n`);
});

function startBot() {
    if (botProcess) {
        mainWindow?.webContents.send('log', '⚠️ Bot já está rodando!\n');
        return;
    }

    const botScript = path.join(__dirname, '..', 'whatsapp-bot', 'main.py');
    botProcess = spawn('python', [botScript], {
        cwd: path.join(__dirname, '..', 'whatsapp-bot'),
        shell: true
    });

    botProcess.stdout.on('data', (data) => {
        const msg = data.toString();
        log.info(msg);
        mainWindow?.webContents.send('log', msg);
    });

    botProcess.stderr.on('data', (data) => {
        const msg = data.toString();
        log.error(msg);
        mainWindow?.webContents.send('log', `❌ ${msg}`);
    });

    botProcess.on('close', (code) => {
        mainWindow?.webContents.send('log', `Bot encerrado (código: ${code})\n`);
        botProcess = null;
    });

    mainWindow?.webContents.send('log', '🚀 Bot iniciado!\n');
    mainWindow?.webContents.send('status', 'online');
}

function stopBot() {
    if (!botProcess) {
        mainWindow?.webContents.send('log', '⚠️ Bot não está rodando!\n');
        return;
    }

    botProcess.kill();
    botProcess = null;
    mainWindow?.webContents.send('log', '⏹️ Bot parado!\n');
    mainWindow?.webContents.send('status', 'offline');
}

ipcMain.on('start-bot', startBot);
ipcMain.on('stop-bot', stopBot);
ipcMain.on('check-update', checkForUpdates);

ipcMain.handle('get-status', () => botProcess ? 'online' : 'offline');

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => {
    if (botProcess) botProcess.kill();
    if (process.platform !== 'darwin') app.quit();
});