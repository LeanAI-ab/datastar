# Directory - Modern Landingssida

En modern, stilistisk directory-landingssida byggd med:
- **Datastar.dev** för frontend-reaktivitet
- **Basecoat UI** (Tailwind CSS) för styling
- **Express.js** backend med REST API
- **Neon Postgres** serverless databas

## 🚀 Komma Igång

### Snabbstart

```bash
# 1. Installera dependencies
npm install

# 2. Konfigurera databas (se SETUP.md för detaljer)
cp .env.example .env
# Redigera .env och lägg till din Neon DATABASE_URL

# 3. Kör migrations
npm run migrate

# 4. Starta servern
npm run server
```

Navigera till `http://localhost:3000`

**För fullständiga setup-instruktioner, se [SETUP.md](SETUP.md)**

### Development Workflow

```bash
# Terminal 1: Starta backend servern
npm run server:dev

# Terminal 2: Bygg Tailwind CSS (om du gör CSS-ändringar)
npm run dev
```

## ✨ Funktioner

### Frontend (Implementerat)
- ✅ Responsiv navigation med mobil-meny
- ✅ Dark mode-toggle med Datastar
- ✅ Snygg hero-sektion med gradient
- ✅ Kategorikort med hover-effekter
- ✅ Directory-listning med 6 exempel-kort
- ✅ Interaktiva favorit-knappar (Datastar)
- ✅ Filter-knappar för listningar
- ✅ Sökfunktion med Datastar-binding
- ✅ CTA-sektion
- ✅ Footer med länkar

### Backend (Implementerat)
- ✅ Express.js REST API server
- ✅ Neon Postgres databas integration
- ✅ API endpoints för listings och categories
- ✅ Filtrering och sökning
- ✅ Paginering
- ✅ Database migrations med sample data

### Datastar-Funktioner
- Reaktiv state management med `data-signals`
- Interaktiv mobilmeny med `data-on:click`
- Dark mode-toggle
- Favoritmarkering per kort
- Filterhantering
- Sök-binding med `data-model`

## 📁 Projektstruktur

```
datastar/
├── server/
│   ├── index.js           # Express server
│   ├── db.js              # Database connection
│   ├── schema.sql         # Database schema
│   ├── migrate.js         # Migration script
│   └── routes/
│       ├── listings.js    # Listings API
│       └── categories.js  # Categories API
├── public/
│   └── css/
│       └── output.css     # Genererad CSS
├── src/
│   └── css/
│       └── input.css      # Tailwind source
├── index.html             # Huvudfil
├── SETUP.md               # Setup guide
├── PROJEKTPLAN.md         # Detaljerad projektplan
└── package.json           # npm-konfiguration
```

## 🎨 Designsystem

### Färger
- Primary: Blue (#0ea5e9)
- Gradient accents: Purple, Pink, Green, etc.
- Dark mode: Automatisk hantering

### Komponenter (Basecoat UI-stil)
- `.btn` - Knappklasser
- `.card` - Kort med hover-effekter
- `.badge` - Märken/taggar
- `.input` - Formulärfält

## 🔧 API Endpoints

- `GET /api/listings` - Hämta alla listningar (med filtrering och sökning)
- `GET /api/listings/:id` - Hämta en specifik listning
- `POST /api/listings` - Skapa ny listning
- `GET /api/categories` - Hämta alla kategorier
- `GET /api/categories/:slug` - Hämta specifik kategori
- `GET /api/health` - Health check

### Query Parameters (Listings)
- `?category=slug` - Filtrera per kategori
- `?search=term` - Sök i titel och beskrivning
- `?sort=field` - Sortera (created_at, title, price)
- `?order=ASC|DESC` - Sorteringsordning
- `?limit=50` - Antal resultat per sida
- `?offset=0` - Offset för paginering

## 📝 Nästa Steg

1. **Koppla Frontend till Backend** (Pågående)
   - Hämta dynamiska listings från API
   - Implementera live-filtrering
   - Lägg till live-sökning

2. **Detaljsidor**
   - Skapa individuella sidor för varje listning
   - Bildgalleri/carousel
   - Kontaktformulär

3. **Realtidsuppdateringar**
   - Implementera SSE för nya listningar
   - Live notifikationer

Se [PROJEKTPLAN.md](PROJEKTPLAN.md) för fullständig roadmap!

## 📄 Licens

MIT
