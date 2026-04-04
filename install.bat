@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║        DRASI — Installation setup        ║
echo  ╚══════════════════════════════════════════╝
echo.

:: ─── Détecter WampServer ──────────────────────────────────────────────────────
set "WAMP_DIR=C:\wamp64"
if not exist "%WAMP_DIR%" (
    set "WAMP_DIR=C:\wamp"
    if not exist "!WAMP_DIR!" (
        echo  [ERR] WampServer introuvable (C:\wamp64 ou C:\wamp)
        echo        Modifiez la variable WAMP_DIR dans ce fichier.
        pause
        exit /b 1
    )
)
echo  [OK]  WampServer trouvé : %WAMP_DIR%

:: ─── Détecter PHP ─────────────────────────────────────────────────────────────
set "PHP_EXE="
for /d %%D in ("%WAMP_DIR%\bin\php\php*") do (
    if exist "%%D\php.exe" set "PHP_EXE=%%D\php.exe"
)
if not defined PHP_EXE (
    echo  [ERR] php.exe introuvable dans %WAMP_DIR%\bin\php\
    pause
    exit /b 1
)
echo  [OK]  PHP trouvé : %PHP_EXE%

:: ─── Vérifier que WampServer est démarré (port 80 et 3306) ──────────────────
echo  [INFO] Vérification que WampServer est en cours d'exécution...
netstat -ano | findstr ":3306" >nul 2>&1
if errorlevel 1 (
    echo.
    echo  [WARN] MySQL ne semble pas actif sur le port 3306.
    echo         Assurez-vous que WampServer est démarré (icône verte).
    echo.
    set /p CONTINUE="  Continuer quand même ? (O/N) : "
    if /i "!CONTINUE!" NEQ "O" (
        echo  Installation annulée.
        pause
        exit /b 0
    )
) else (
    echo  [OK]  MySQL actif sur le port 3306
)

:: ─── Chemin du script setup.php ───────────────────────────────────────────────
set "SCRIPT_DIR=%~dp0"
set "SETUP_PHP=%SCRIPT_DIR%setup\setup.php"

if not exist "%SETUP_PHP%" (
    echo  [ERR] setup\setup.php introuvable dans %SCRIPT_DIR%
    pause
    exit /b 1
)

:: ─── Exécution de setup.php ──────────────────────────────────────────────────
echo.
echo  Lancement de l'installation...
echo  ──────────────────────────────────────────
echo.
"%PHP_EXE%" "%SETUP_PHP%"
if errorlevel 1 (
    echo.
    echo  [ERR] Le script setup.php a rencontré une erreur.
    pause
    exit /b 1
)

:: ─── Affichage de credentials.txt ────────────────────────────────────────────
set "CREDS=%SCRIPT_DIR%credentials.txt"
if exist "%CREDS%" (
    echo.
    echo  ══════════════════════════════════════════
    type "%CREDS%"
    echo  ══════════════════════════════════════════
    echo.
    echo  Le fichier credentials.txt a été enregistré dans le dossier du projet.
) else (
    echo  [WARN] credentials.txt non trouvé.
)

echo.
echo  Installation terminée. Appuyez sur une touche pour fermer.
pause >nul
endlocal
