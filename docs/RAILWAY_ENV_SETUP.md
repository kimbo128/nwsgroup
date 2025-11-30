# Railway Environment Variables Setup

## 🔧 NextAuth Konfiguration

Um den Server-Fehler beim Login zu beheben, müssen folgende Umgebungsvariablen in Railway gesetzt werden:

### 1. Railway Dashboard öffnen

1. Gehe zu [railway.app](https://railway.app)
2. Öffne dein Projekt
3. Klicke auf deinen Service (z.B. "nwsgroup-production")
4. Gehe zum Tab **"Variables"**

### 2. NEXTAUTH_SECRET setzen

**WICHTIG:** Diese Variable ist erforderlich für NextAuth!

1. Klicke auf **"New Variable"**
2. **Name**: `NEXTAUTH_SECRET`
3. **Value**: Generiere ein sicheres Secret:

#### Option A: Mit OpenSSL (empfohlen)
```bash
openssl rand -base64 32
```

#### Option B: Mit Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### Option C: Online Generator
- Gehe zu [generate-secret.vercel.app](https://generate-secret.vercel.app/32)
- Kopiere den generierten Wert

4. Füge den generierten Wert als Value ein
5. Klicke auf **"Add"**

### 3. NEXTAUTH_URL setzen

1. Klicke auf **"New Variable"**
2. **Name**: `NEXTAUTH_URL`
3. **Value**: 
   - Für Production: `https://nwsgroup-production.up.railway.app`
   - Oder deine eigene Domain: `https://deine-domain.com`
4. Klicke auf **"Add"**

### 4. DATABASE_URL prüfen

Stelle sicher, dass `DATABASE_URL` bereits gesetzt ist:
- Diese Variable wird normalerweise automatisch von Railway erstellt
- Format: `postgresql://user:password@host:port/database`

### 5. Service neu starten

Nach dem Setzen der Variablen:
1. Gehe zum Tab **"Deployments"**
2. Klicke auf **"Redeploy"** oder warte auf automatisches Redeploy
3. Oder: Klicke auf die drei Punkte → **"Restart"**

## ✅ Verifizierung

Nach dem Redeploy:

1. Gehe zu `/login`
2. Versuche dich anzumelden
3. Der Server-Fehler sollte jetzt behoben sein

## 🐛 Troubleshooting

### Fehler: "NEXTAUTH_SECRET is missing"

**Lösung:**
- Stelle sicher, dass `NEXTAUTH_SECRET` in Railway Variables gesetzt ist
- Prüfe, dass der Name exakt `NEXTAUTH_SECRET` ist (Groß-/Kleinschreibung beachten)
- Starte den Service neu

### Fehler: "There is a problem with the server configuration"

**Lösung:**
1. Prüfe Railway Logs:
   - Gehe zu deinem Service
   - Klicke auf **"Logs"**
   - Suche nach Fehlermeldungen

2. Prüfe alle Variablen:
   - `NEXTAUTH_SECRET` ✓
   - `NEXTAUTH_URL` ✓
   - `DATABASE_URL` ✓

3. Prüfe die Railway Logs für detaillierte Fehlermeldungen:
   ```bash
   # Mit Railway CLI
   railway logs
   ```

### Fehler: "Invalid credentials"

**Lösung:**
- Das ist ein anderes Problem (falsches Passwort oder User existiert nicht)
- Prüfe ob der User in der Datenbank existiert
- Prüfe ob das Passwort korrekt ist

## 📋 Checkliste

- [ ] `NEXTAUTH_SECRET` ist gesetzt (32+ Zeichen)
- [ ] `NEXTAUTH_URL` ist gesetzt (vollständige URL mit https://)
- [ ] `DATABASE_URL` ist gesetzt
- [ ] Service wurde neu gestartet/redeployed
- [ ] Railway Logs zeigen keine Fehler

## 🔐 Sicherheit

- **NEXTAUTH_SECRET**: 
  - Niemals im Code committen!
  - Verwende immer ein starkes, zufälliges Secret
  - Ändere es regelmäßig bei Sicherheitsbedenken

- **NEXTAUTH_URL**:
  - Muss die exakte URL deiner Anwendung sein
  - Kein trailing slash (`/`) am Ende
  - Muss `https://` verwenden in Production

