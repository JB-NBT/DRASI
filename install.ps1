#Requires -Version 5.0

$ErrorActionPreference = 'Stop'

function Write-Ok   ($msg) { Write-Host "  [OK]   $msg" -ForegroundColor Green }
function Write-Err  ($msg) { Write-Host "  [ERR]  $msg" -ForegroundColor Red }
function Write-Info ($msg) { Write-Host "  [INFO] $msg" -ForegroundColor Cyan }
function Write-Warn ($msg) { Write-Host "  [WARN] $msg" -ForegroundColor Yellow }

Write-Host ""
Write-Host "  ==========================================" -ForegroundColor Cyan
Write-Host "       DRASI - Installation setup"           -ForegroundColor Cyan
Write-Host "  ==========================================" -ForegroundColor Cyan
Write-Host ""

# Detecter WampServer
$wampDir = $null
foreach ($candidate in @("C:\wamp64", "C:\wamp")) {
    if (Test-Path $candidate) { $wampDir = $candidate; break }
}
if (-not $wampDir) {
    Write-Err "WampServer introuvable (C:\wamp64 ou C:\wamp)"
    Read-Host "Appuyez sur Entree pour quitter"
    exit 1
}
Write-Ok "WampServer trouve : $wampDir"

# Detecter PHP
$phpExe = $null
Get-ChildItem "$wampDir\bin\php" -Directory -Filter "php*" | ForEach-Object {
    $candidate = Join-Path $_.FullName "php.exe"
    if (Test-Path $candidate) { $phpExe = $candidate }
}
if (-not $phpExe) {
    Write-Err "php.exe introuvable dans $wampDir\bin\php\"
    Read-Host "Appuyez sur Entree pour quitter"
    exit 1
}
Write-Ok "PHP trouve : $phpExe"

# Verifier MySQL (port 3306)
Write-Info "Verification de MySQL sur le port 3306..."
$mysqlActive = netstat -ano | Select-String ":3306"
if (-not $mysqlActive) {
    Write-Warn "MySQL ne semble pas actif sur le port 3306."
    Write-Warn "Assurez-vous que WampServer est demarre (icone verte)."
    Write-Host ""
    $continue = Read-Host "  Continuer quand meme ? (O/N)"
    if ($continue -notmatch '^[Oo]$') {
        Write-Host "  Installation annulee."
        exit 0
    }
} else {
    Write-Ok "MySQL actif sur le port 3306"
}

# Localiser setup.php
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$setupPhp  = Join-Path $scriptDir "setup\setup.php"

if (-not (Test-Path $setupPhp)) {
    Write-Err "setup\setup.php introuvable dans $scriptDir"
    Read-Host "Appuyez sur Entree pour quitter"
    exit 1
}

# Lancer setup.php
Write-Host ""
Write-Info "Lancement de l'installation DRASI..."
Write-Host "  ------------------------------------------"
Write-Host ""

& $phpExe $setupPhp
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Err "Erreur lors de l'execution de setup.php (code $LASTEXITCODE)."
    Read-Host "Appuyez sur Entree pour quitter"
    exit 1
}

# Afficher credentials.txt
$credsFile = Join-Path $scriptDir "credentials.txt"
if (Test-Path $credsFile) {
    Write-Host ""
    Write-Host "  ==========================================" -ForegroundColor Green
    Get-Content $credsFile | ForEach-Object { Write-Host "  $_" }
    Write-Host "  ==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Ok "credentials.txt enregistre dans le dossier du projet."
} else {
    Write-Warn "credentials.txt non trouve."
}

# ============================================================
# Installer GLPI
# ============================================================
Write-Host ""
Write-Host "  ==========================================" -ForegroundColor Cyan
Write-Host "       GLPI - Installation"                  -ForegroundColor Cyan
Write-Host "  ==========================================" -ForegroundColor Cyan
Write-Host ""

$glpiDest = "$wampDir\www\glpi"

if (Test-Path $glpiDest) {
    Write-Ok "GLPI deja present dans $glpiDest - etape ignoree."
} else {
    Write-Info "Recuperation de la derniere version de GLPI..."

    try {
        $releaseInfo = Invoke-RestMethod -Uri "https://api.github.com/repos/glpi-project/glpi/releases/latest" -UseBasicParsing
        $asset = $releaseInfo.assets | Where-Object { $_.name -like "glpi-*.tgz" } | Select-Object -First 1

        if (-not $asset) {
            Write-Err "Archive GLPI introuvable dans la release."
            Read-Host "Appuyez sur Entree pour quitter"
            exit 1
        }

        $glpiVersion = $releaseInfo.tag_name
        $downloadUrl = $asset.browser_download_url
        $tempArchive = "$env:TEMP\glpi-latest.tgz"

        Write-Info "Telechargement de GLPI $glpiVersion..."
        Invoke-WebRequest -Uri $downloadUrl -OutFile $tempArchive -UseBasicParsing
        Write-Ok "Archive telechargee"

        Write-Info "Extraction dans $wampDir\www\ ..."
        $tempExtract = "$env:TEMP\glpi-extract"
        if (Test-Path $tempExtract) { Remove-Item $tempExtract -Recurse -Force }
        New-Item -ItemType Directory -Path $tempExtract | Out-Null

        tar -xzf $tempArchive -C $tempExtract
        $extracted = Get-ChildItem $tempExtract -Directory | Select-Object -First 1
        Move-Item $extracted.FullName $glpiDest

        Remove-Item $tempArchive -Force
        Remove-Item $tempExtract -Recurse -Force

        Write-Ok "GLPI $glpiVersion extrait dans $glpiDest"
        Write-Host ""
        Write-Host "  --> Ouvrez http://localhost/glpi/ dans votre navigateur" -ForegroundColor Yellow
        Write-Host "      pour finaliser la config (base de donnees, compte admin)." -ForegroundColor Yellow

    } catch {
        Write-Warn "Echec du telechargement automatique : $_"
        Write-Warn "Telechargez GLPI manuellement sur https://glpi-project.org"
        Write-Warn "et extrayez-le dans $glpiDest"
    }
}

Write-Host ""
Write-Host "  Installation terminee !" -ForegroundColor Green
Write-Host ""
Read-Host "Appuyez sur Entree pour fermer"
