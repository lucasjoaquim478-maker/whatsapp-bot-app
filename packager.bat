@echo off
echo.
echo ===============================
echo   WhatsApp Bot - Build Packager
echo ===============================
echo.

cd /d "%~dp0"

echo [1/4] Removendo cache和问题...
if exist "dist" rmdir /s /q "dist"

echo.
echo [2/4]Instalando electron-packager...
call npm install electron-packager --save-dev

echo.
echo [3/4] Buildando app (pode levar 2-5 minutos)...
call npx electron-packager . "WhatsAppBot" --platform=win32 --arch=x64 --out=dist --overwrite

echo.
echo ===============================
echo   Build concluído!
echo   Execute: dist\WhatsAppBot\WhatsAppBot.exe
echo ===============================
pause