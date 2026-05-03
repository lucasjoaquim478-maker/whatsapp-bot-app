const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    startBot: () => ipcRenderer.send('start-bot'),
    stopBot: () => ipcRenderer.send('stop-bot'),
    checkUpdate: () => ipcRenderer.send('check-update'),
    getStatus: () => ipcRenderer.invoke('get-status'),
    onLog: (callback) => ipcRenderer.on('log', (_, msg) => callback(msg)),
    onStatus: (callback) => ipcRenderer.on('status', (_, status) => callback(status))
});