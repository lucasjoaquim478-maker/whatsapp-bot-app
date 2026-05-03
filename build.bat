@echo off
echo.
echo ===============================
echo   WhatsApp Bot - Build
echo ===============================
echo.

cd /d "%~dp0"

echo [1/3] Instalando dependencias...
call npm install

echo.
echo [2/3] Criando pasta assets...
if not exist "src\renderer\assets" mkdir "src\renderer\assets"

echo.
echo [3/3] Buildando app...
call npm run build

echo.
echo ===============================
echo   Build concluído!
echo   Execute: npm start
echo ===============================
pause