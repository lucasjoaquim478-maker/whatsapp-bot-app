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

echo [2/6] Verificando dependencias...
call npm install

echo.
echo [3/6] Baixando Electron (pode levar 3-5 min)...
call npx electron-packager . "WhatsAppBot" --platform=win32 --arch=x64 --out=dist --overwrite

if exist "dist\WhatsAppBot-win32-x64\WhatsAppBot.exe" (
    echo.
    echo ================================================
    echo   EXE criado com sucesso!
    echo.
    echo   Arquivo: dist\WhatsAppBot-win32-x64\WhatsAppBot.exe
    echo ================================================
    start explorer /select,"dist\WhatsAppBot-win32-x64\WhatsAppBot.exe"
) else (
    echo.
    echo ERRO: Falha ao criar EXE
    echo Execute como Administrador e tente novamente
)
pause