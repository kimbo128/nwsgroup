# Admin-Bereich Setup Anleitung

## 🔐 Wie logge ich mich als Admin ein?

### Schritt 1: Admin-User erstellen

Du hast mehrere Möglichkeiten, einen Admin-User zu erstellen:

#### Option A: Über die Datenbank (Empfohlen)

1. **Railway Dashboard öffnen**:
   - Gehe zu deinem Railway Projekt
   - Klicke auf die PostgreSQL Datenbank
   - Klicke auf "Query" oder "Connect"

2. **SQL Query ausführen**:
   ```sql
   -- Prüfe ob dein User existiert
   SELECT id, email, name, role FROM "User" WHERE email = 'deine-email@example.com';
   
   -- Falls User existiert, setze role auf 'admin'
   UPDATE "User" SET role = 'admin' WHERE email = 'deine-email@example.com';
   
   -- Falls User nicht existiert, erstelle einen neuen Admin-User
   -- (Passwort muss gehasht sein - siehe Option B)
   ```

#### Option B: Über die Registrierung + SQL Update

1. **Registriere dich normal**:
   - Gehe zu `/register`
   - Erstelle einen Account mit deiner E-Mail

2. **Setze role auf 'admin'**:
   ```sql
   UPDATE "User" SET role = 'admin' WHERE email = 'deine-email@example.com';
   ```

#### Option C: Script erstellen (für Entwicklung)

Erstelle eine Datei `scripts/create-admin.ts`:

```typescript
import { prisma } from "../src/lib/db"
import bcrypt from "bcryptjs"

async function createAdmin() {
  const email = "admin@nwsgroup.ch"
  const password = "dein-sicheres-passwort"
  const name = "Admin User"

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: { role: "admin" },
    create: {
      email,
      name,
      password: hashedPassword,
      role: "admin",
    },
  })

  console.log("Admin user created/updated:", user)
}

createAdmin()
  .catch(console.error)
  .finally(() => process.exit())
```

Dann ausführen:
```bash
npx tsx scripts/create-admin.ts
```

---

### Schritt 2: Einloggen

1. **Gehe zu `/login`**
2. **Gib deine E-Mail und Passwort ein**
3. **Klicke auf "Anmelden"**

---

### Schritt 3: Admin-Bereich öffnen

Nach dem Login:

1. **Gehe zu `/admin`**
2. **Falls du nicht als Admin eingeloggt bist**, wirst du automatisch zu `/dashboard` weitergeleitet

---

## 🛠️ Was kann ich im Admin-Bereich machen?

### Tab 1: AutoScout Sync
- **Manueller Sync**: Klicke auf "Jetzt synchronisieren"
- Synchronisiert alle Fahrzeuge von AutoScout24
- Zeigt Statistiken (erstellt, aktualisiert, als verkauft markiert)

### Tab 2: Galerie
- **Bilder hochladen**: Wähle Bilder aus und lade sie hoch
- **Kategorien**: Fahrzeuge, Werkstatt, Team
- **Verwaltung**: Alle hochgeladenen Bilder werden angezeigt

### Tab 3: Einstellungen
- **Website-Titel**: Ändere den Titel der Website
- **Website-Beschreibung**: Ändere die Meta-Beschreibung
- **Kontakt-E-Mail**: Setze die Standard-Kontakt-E-Mail

---

## 🔍 Admin-Status prüfen

### Über die API:
```bash
curl https://deine-domain.com/api/admin/check
```

Antwort:
```json
{
  "isAdmin": true
}
```

### Über die Datenbank:
```sql
SELECT email, role FROM "User" WHERE role = 'admin';
```

---

## 🐛 Troubleshooting

### Problem: "Forbidden" Fehler beim Zugriff auf `/admin`

**Lösung**:
1. Prüfe ob dein User `role = 'admin'` hat:
   ```sql
   SELECT email, role FROM "User" WHERE email = 'deine-email@example.com';
   ```

2. Falls nicht, setze es:
   ```sql
   UPDATE "User" SET role = 'admin' WHERE email = 'deine-email@example.com';
   ```

3. Logge dich aus und wieder ein

### Problem: User existiert nicht

**Lösung**:
1. Registriere dich zuerst über `/register`
2. Dann setze die role auf 'admin' über SQL

### Problem: Passwort vergessen

**Lösung**:
1. Setze ein neues Passwort über SQL (muss gehasht sein):
   ```sql
   -- Generiere Hash lokal:
   -- node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('neues-passwort', 10).then(console.log)"
   
   UPDATE "User" 
   SET password = 'gehashtes-passwort-hier' 
   WHERE email = 'deine-email@example.com';
   ```

---

## 📝 Wichtige Hinweise

- **Sicherheit**: Bewahre deine Admin-Credentials sicher auf
- **Passwort**: Verwende ein starkes Passwort
- **Backup**: Erstelle regelmäßig Backups der Datenbank
- **Logs**: Prüfe Railway Logs für Fehler

---

## 🚀 Quick Start

**Schnellste Methode:**

1. Registriere dich: `/register`
2. Railway → PostgreSQL → Query:
   ```sql
   UPDATE "User" SET role = 'admin' WHERE email = 'deine-email@example.com';
   ```
3. Logge dich ein: `/login`
4. Gehe zu Admin: `/admin`

**Fertig!** 🎉

