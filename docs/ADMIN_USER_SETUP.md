# Admin User Setup

## User zu Admin machen in Railway PostgreSQL

### Option 1: Über Railway Dashboard (Empfohlen)

1. Gehe zu deinem Railway Dashboard
2. Öffne dein Projekt und gehe zur PostgreSQL-Datenbank
3. Klicke auf "Query" oder "Connect" um die Datenbank zu öffnen
4. Führe folgende SQL-Query aus:

```sql
UPDATE "User" 
SET role = 'admin' 
WHERE email = 'deine-email@example.com';
```

Ersetze `deine-email@example.com` mit der E-Mail-Adresse des Users, den du zu Admin machen möchtest.

### Option 2: Über Railway CLI

1. Installiere Railway CLI falls noch nicht geschehen:
```bash
npm i -g @railway/cli
```

2. Verbinde dich mit Railway:
```bash
railway login
```

3. Verbinde dich mit der Datenbank:
```bash
railway connect postgres
```

4. Führe die SQL-Query aus:
```sql
UPDATE "User" SET role = 'admin' WHERE email = 'deine-email@example.com';
```

### Option 3: Über Prisma Studio (Lokal)

1. Stelle sicher, dass deine `.env` die Railway DATABASE_URL enthält
2. Öffne Prisma Studio:
```bash
npx prisma studio
```

3. Navigiere zu "User" und bearbeite den gewünschten User
4. Ändere das Feld `role` von `user` zu `admin`
5. Speichere die Änderungen

### Option 4: Über eine API-Route (Temporär)

Erstelle eine temporäre API-Route zum Setzen von Admin-Rechten:

**WICHTIG:** Diese Route sollte nach dem Setup wieder entfernt werden!

```typescript
// src/app/api/admin/set-admin/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  const { email } = await request.json()
  
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    })
    
    return NextResponse.json({ success: true, user })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
```

Dann kannst du einen POST-Request machen:
```bash
curl -X POST https://deine-domain.com/api/admin/set-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"deine-email@example.com"}'
```

## Verifizierung

Nach dem Setzen der Admin-Rolle:

1. Melde dich ab und wieder an
2. Du solltest jetzt Zugriff auf `/dashboard` haben
3. Die Coming Soon Seite sollte übersprungen werden

## Troubleshooting

### Server Error beim Login

Wenn du einen Server-Fehler beim Login bekommst, prüfe:

1. **NEXTAUTH_URL** ist in Railway Environment Variables gesetzt:
   - Für Production: `https://nwsgroup-production.up.railway.app`
   - Für Development: `http://localhost:3000`

2. **NEXTAUTH_SECRET** ist gesetzt:
   ```bash
   # Generiere ein Secret:
   openssl rand -base64 32
   ```
   Setze dies in Railway Environment Variables

3. **DATABASE_URL** ist korrekt konfiguriert

4. Prüfe die Railway Logs für detaillierte Fehlermeldungen

### User wird nicht als Admin erkannt

1. Stelle sicher, dass die Rolle in der Datenbank wirklich `admin` ist (nicht `Admin` oder `ADMIN`)
2. Melde dich ab und wieder an, damit die Session aktualisiert wird
3. Prüfe die Browser-Konsole für Fehler



