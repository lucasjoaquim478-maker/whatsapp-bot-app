@echo off
chcp 65001 >nul
cls
echo ================================================
echo   WhatsApp Bot - Criar EXE
echo ================================================
echo.

cd /d "%~dp0"

echo [1/6] Limpando build anterior...
if exist "dist" rmdir /s /q "dist"
if exist "node_modules\electron-packager" goto skip1
echo [2/6] Instalando packager...
call npm install electron-packager --save-dev
:skip1

echo.
echo [3/6] Baixando Electron (pode levar 3-5 min)...
call npx electron-packager . "WhatsAppBot" --platform=win32 --arch=x64 --out=dist --overwrite --icon=assets\icon.ico --ignore="^/dist" --ignore="^/\.git" --ignore="^/README" --ignore="^/build" --ignore="^/packager"

if exist "dist\WhatsAppBot.exe" (
    echo.
    echo ================================================
    echo   EXE criado com sucesso!
    echo   Arquivo: dist\WhatsAppBot.exe
    echo ================================================
    start explorer /select,"dist\WhatsAppBot.exe"
) else (
    echo.
    echo ERRO: Falha ao criar EXE
    echo Tente executar como Administrador
)
pause