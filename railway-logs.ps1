# Railway Logs Script
# Verwendet die Railway API direkt mit dem Token

param(
    [string]$Token = $env:RAILWAY_TOKEN,
    [int]$Tail = 100
)

if (-not $Token) {
    Write-Host "Fehler: Railway Token nicht gefunden. Setze RAILWAY_TOKEN Umgebungsvariable oder gib --Token an." -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $Token"
    "Content-Type" = "application/json"
}

Write-Host "Railway Logs werden abgerufen..." -ForegroundColor Green

# Versuche, Projekte abzurufen
try {
    $projects = Invoke-RestMethod -Uri "https://api.railway.app/v1/projects" -Headers $headers -Method Get
    Write-Host "`nVerfügbare Projekte:" -ForegroundColor Cyan
    $projects | ForEach-Object {
        Write-Host "  - $($_.name) (ID: $($_.id))" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Fehler beim Abrufen der Projekte: $_" -ForegroundColor Red
    Write-Host "Hinweis: Möglicherweise ist der Token ungültig oder die API-Endpunkte haben sich geändert." -ForegroundColor Yellow
}

Write-Host "`nUm die Logs für ein bestimmtes Projekt abzurufen, benötige ich die Projekt-ID." -ForegroundColor Cyan
Write-Host "Du kannst die Projekt-ID in der Railway-Weboberfläche finden." -ForegroundColor Cyan



