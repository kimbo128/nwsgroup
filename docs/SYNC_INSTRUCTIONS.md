# AutoScout24 Sync Anleitung

## 🚗 Wie hole ich die Autos von AutoScout24?

Es gibt mehrere Möglichkeiten, die Fahrzeuge von AutoScout24 zu synchronisieren:

### 1. Über den Admin-Bereich (Empfohlen)

1. **Als Admin einloggen** auf `/login`
2. Gehe zu `/admin`
3. Klicke auf den Tab **"AutoScout Sync"**
4. Klicke auf **"Jetzt synchronisieren"**
5. Warte auf die Bestätigung

**Vorteile:**
- Einfach zu bedienen
- Siehst sofort das Ergebnis
- Keine technischen Kenntnisse nötig

---

### 2. Über die API-Route direkt

#### Mit curl (Terminal):
```bash
curl -X POST https://deine-domain.com/api/vehicles/sync
```

#### Mit PowerShell (Windows):
```powershell
Invoke-RestMethod -Uri "https://deine-domain.com/api/vehicles/sync" -Method POST
```

#### Mit Postman oder ähnlichen Tools:
- **URL**: `https://deine-domain.com/api/vehicles/sync`
- **Method**: `POST`
- **Headers**: Keine erforderlich (optional: Authorization)

**Antwort:**
```json
{
  "success": true,
  "message": "Sync completed",
  "stats": {
    "fetched": 15,
    "created": 3,
    "updated": 12,
    "markedAsSold": 2
  }
}
```

---

### 3. Automatisch täglich (Cron Job)

#### Option A: Railway Cron Job

1. Im Railway Dashboard:
   - Erstelle einen neuen **Cron Service**
   - **Command**: `node -e "require('./src/lib/cron').syncVehicles()"`
   - **Schedule**: `0 2 * * *` (täglich um 02:00 Uhr)

#### Option B: Railway HTTP Cron

1. Im Railway Dashboard:
   - Erstelle einen neuen **Cron Service**
   - **Command**: `curl -X POST https://deine-domain.com/api/vehicles/sync`
   - **Schedule**: `0 2 * * *` (täglich um 02:00 Uhr)

#### Option C: Externer Cron Service (z.B. cron-job.org)

1. Gehe zu [cron-job.org](https://cron-job.org) oder ähnlichem Service
2. Erstelle einen neuen Cron Job:
   - **URL**: `https://deine-domain.com/api/vehicles/sync`
   - **Method**: `POST`
   - **Schedule**: Täglich um 02:00 Uhr

---

### 4. Lokal testen (Development)

```bash
# Im Projekt-Verzeichnis
npm run dev

# In einem neuen Terminal
curl -X POST http://localhost:3000/api/vehicles/sync
```

---

## 🔍 Was passiert beim Sync?

1. **Fetch**: Lädt alle Fahrzeuge von AutoScout24
2. **Parse**: Extrahiert alle Fahrzeugdaten (Marke, Modell, Preis, etc.)
3. **Compare**: Vergleicht mit bestehenden Fahrzeugen in der Datenbank
4. **Update**: 
   - Neue Fahrzeuge werden erstellt
   - Bestehende Fahrzeuge werden aktualisiert
   - Nicht mehr vorhandene Fahrzeuge werden als "sold" markiert

---

## ⚙️ Konfiguration

Die AutoScout24 URL kann über Environment Variable geändert werden:

```env
AUTOSCOUT24_SELLER_URL=https://www.autoscout24.ch/de/s/seller-2328369
```

Standard: `https://www.autoscout24.ch/de/s/seller-2328369`

---

## 🐛 Troubleshooting

### Keine Fahrzeuge werden gefunden?

1. **Prüfe die AutoScout24 URL**:
   - Öffne die URL im Browser
   - Stelle sicher, dass Fahrzeuge angezeigt werden

2. **Prüfe die Logs**:
   - Railway Dashboard → Deployments → Logs
   - Suche nach "Starting vehicle sync" und Fehlermeldungen

3. **Parser anpassen**:
   - Die HTML-Struktur von AutoScout24 kann sich ändern
   - Parser-Selektoren in `src/app/api/vehicles/sync/route.ts` anpassen

### Sync schlägt fehl?

1. **Datenbank-Verbindung prüfen**:
   - Stelle sicher, dass `DATABASE_URL` korrekt gesetzt ist

2. **Prisma Schema prüfen**:
   - Führe `npx prisma db push` aus

3. **Manuell testen**:
   - Teste die API-Route direkt mit curl/Postman

---

## 📊 Sync-Status prüfen

Nach einem Sync kannst du prüfen:

1. **In der Datenbank**:
   ```sql
   SELECT COUNT(*) FROM "Vehicle" WHERE status = 'available';
   SELECT MAX("lastSynced") FROM "Vehicle";
   ```

2. **Auf der Website**:
   - Gehe zu `/fahrzeuge`
   - Alle verfügbaren Fahrzeuge sollten angezeigt werden

---

## 🔐 Sicherheit

**Aktuell**: Die Sync-Route ist öffentlich zugänglich.

**Für Production empfohlen**:
- Authorization Header hinzufügen
- Oder nur über Admin-Bereich zugänglich machen

Um Authorization zu aktivieren, entferne die Kommentare in `src/app/api/vehicles/sync/route.ts`:
```typescript
const authHeader = request.headers.get("authorization")
if (authHeader !== `Bearer ${process.env.SYNC_SECRET}`) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

Dann setze `SYNC_SECRET` in Railway Environment Variables.

