# Directory - Modern Landingssida

En modern, stilistisk directory-landingssida byggd med:
- **Datastar.dev** för frontend-reaktivitet
- **Basecoat UI** (Tailwind CSS) för styling
- **Neon Postgres** för backend (planerad)

## 🚀 Komma Igång

### Installation

```bash
# Installera dependencies
npm install

# Bygg Tailwind CSS
npm run build

# För utveckling med auto-reload
npm run dev
```

### Öppna Sidan

Öppna `index.html` i din webbläsare eller använd en lokal server:

```bash
# Med Python
python3 -m http.server 8000

# Med Node.js (http-server)
npx http-server -p 8000

# Med PHP
php -S localhost:8000
```

Navigera sedan till `http://localhost:8000`

## ✨ Funktioner

### Implementerat
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
├── index.html              # Huvudfil
├── package.json            # npm-konfiguration
├── tailwind.config.js      # Tailwind-konfiguration
├── PROJEKTPLAN.md          # Detaljerad projektplan
├── src/
│   └── css/
│       └── input.css       # Tailwind source
└── public/
    ├── css/
    │   └── output.css      # Genererad CSS
    └── images/             # Bilder (tom än så länge)
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

## 🔧 Nästa Steg

1. **Backend Setup**
   - Sätt upp Neon Postgres databas
   - Skapa API endpoints
   - Implementera SSE för realtidsuppdateringar

2. **Dynamiskt Innehåll**
   - Hämta listningar från databas
   - Implementera sökfunktion
   - Lägg till filterlogik

3. **Detaljsidor**
   - Skapa individuella sidor för varje listning
   - Bildgalleri/carousel
   - Kontaktformulär

Se `PROJEKTPLAN.md` för fullständig roadmap!

## 📄 Licens

MIT
