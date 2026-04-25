@echo off
echo Starting QuantumMail servers...
echo.
echo Step 1: Starting WebSocket relay on port 8080...
start "Relay" cmd /c "node backend\relay.js"
timeout /nobreak /t 2 >nul
echo Step 2: Starting Next.js on port 3000...
start "Frontend" cmd /c "cd frontend && npm run dev"
echo.
echo Done! Open these links:
echo   - Your laptop: http://localhost:3000
echo   - Teammate:    http://10.10.23.105:3000
pause