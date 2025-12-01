# NWS Group AG Website

Moderne Next.js 14 Website für NWS Group AG - Autoankauf, -verkauf und Karosseriearbeiten.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **Theme**: next-themes (Dark/Light Mode)
- **Maps**: Leaflet + React-Leaflet (OpenStreetMap)
- **Forms**: React Hook Form + Zod Validation
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL (Railway)
- **ORM**: Prisma

## 📦 Installation

```bash
# Dependencies installieren
npm install

# Environment Variables einrichten
cp .env.example .env
# .env Datei mit eigenen Werten füllen

# Prisma Setup
npx prisma generate
npx prisma db push

# Development Server starten
npm run dev
```

## 🔧 Environment Variables

Siehe `.env.example` für alle benötigten Variablen:

- `DATABASE_URL` - PostgreSQL Connection String
- `NEXTAUTH_URL` - Base URL der Anwendung
- `NEXTAUTH_SECRET` - Secret für NextAuth (generiere mit: `openssl rand -base64 32`)
- `AUTOSCOUT24_SELLER_URL` - AutoScout24 Seller URL

## 🗄️ Database Setup

```bash
# Prisma Client generieren
npx prisma generate

# Migration erstellen
npx prisma migrate dev

# Prisma Studio öffnen (optional)
npx prisma studio
```

## 🔄 AutoScout24 Sync

Die Fahrzeuge werden automatisch von AutoScout24 synchronisiert:

```bash
# Manueller Sync (POST Request)
curl -X POST http://localhost:3000/api/vehicles/sync
```

Für automatischen täglichen Sync:
- Railway Cron Job einrichten
- Oder N8N Workflow mit täglichem Trigger

## 📁 Projektstruktur

```
src/
├── app/                    # Next.js App Router Pages
│   ├── api/               # API Routes
│   ├── dashboard/         # Protected Dashboard
│   └── ...
├── components/            # React Components
│   ├── ui/               # shadcn/ui Components
│   ├── layout/           # Layout Components
│   ├── sections/        # Page Sections
│   └── ...
├── lib/                   # Utilities & Config
│   ├── auth.ts          # NextAuth Config
│   ├── db.ts            # Prisma Client
│   └── ...
└── types/                # TypeScript Types
```

## 🚢 Deployment

### Railway

1. Erstelle ein Railway Projekt
2. Füge PostgreSQL Database hinzu
3. Verbinde GitHub Repository
4. Setze Environment Variables
5. Deploy!

### Pre-Deploy Checklist

- [ ] Prisma Migrations ausführen: `npx prisma migrate deploy`
- [ ] Environment Variables setzen
- [ ] AutoScout24 Sync Route testen
- [ ] Production Build testen: `npm run build && npm start`

## 📝 Features

- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Dark/Light Mode
- ✅ AutoScout24 Integration (automatischer Sync)
- ✅ NextAuth Authentication
- ✅ Kontaktformular mit Validation
- ✅ Interactive Maps (Leaflet)
- ✅ WhatsApp & Telegram Integration
- ✅ Framer Motion Animationen

## 🔗 Links

- AutoScout24: https://www.autoscout24.ch/de/s/seller-2328369
- WhatsApp: +41795511245
- Telegram: t.me/NWSGroupBot

## 📄 License

© 2025 NWS Group AG - Alle Rechte vorbehalten



