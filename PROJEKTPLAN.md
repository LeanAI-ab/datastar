# Projektplan: Directory Landingssida

## 📋 Översikt
En modern directory-sida (katalog/listning) med:
- **Frontend Reaktivitet**: Datastar.dev (hypermedia-driven, ~10KB)
- **Styling**: Basecoat UI (Tailwind CSS-baserat)
- **Backend**: Neon Serverless Postgres
- **Arkitektur**: Server-driven med hypermedia-approach

---

## 🎯 Frontend-Plan (Steg-för-Steg)

### Fas 1: Projekt Setup & Foundation
**Mål**: Sätta upp grundstrukturen för projektet

#### Steg 1.1: Initiera Projektet
- [ ] Skapa projektmapp och grundstruktur
- [ ] Välj backend-ramverk (förslag: Go/Fiber, Python/FastAPI, eller Node/Express)
- [ ] Sätt upp Git repository
- [ ] Skapa `.gitignore` för relevanta filer

#### Steg 1.2: Installera Basecoat UI
- [ ] Installera Tailwind CSS
- [ ] Konfigurera `tailwind.config.js` med Basecoat-tema
- [ ] Integrera Basecoat UI-komponenter
- [ ] Sätt upp dark mode-stöd
- [ ] Skapa bas-CSS fil med Tailwind directives

#### Steg 1.3: Integrera Datastar
- [ ] Inkludera Datastar CDN i HTML (`<script src="https://cdn.jsdelivr.net/npm/@sudodevnull/datastar"></script>`)
- [ ] Alternativt: Ladda ner och hosta Datastar lokalt (10.42 KiB)
- [ ] Verifiera att Datastar laddas korrekt
- [ ] Testa grundläggande reaktivitet med `data-*` attribut

---

### Fas 2: Skapa Grundläggande Layout
**Mål**: Bygga den grundläggande HTML-strukturen med Basecoat UI

#### Steg 2.1: Header & Navigation
- [ ] Skapa header-komponent med Basecoat UI
- [ ] Implementera navigation med responsiv meny
- [ ] Lägg till logotyp och sökfält i header
- [ ] Använd Basecoat UI's Button och Input-komponenter

```html
<!-- Exempel: Header med Datastar reaktivitet -->
<header data-signals='{"mobileMenuOpen": false}'>
  <nav class="basecoat-nav">
    <button data-on:click="mobileMenuOpen = !mobileMenuOpen">
      Menu
    </button>
  </nav>
</header>
```

#### Steg 2.2: Main Layout
- [ ] Skapa huvudlayout med sidebar och content-area
- [ ] Använd Tailwind CSS Grid/Flexbox för layout
- [ ] Implementera responsiv design (mobile-first)
- [ ] Lägg till breadcrumbs med Basecoat UI

#### Steg 2.3: Footer
- [ ] Skapa footer med länkar och information
- [ ] Lägg till social media-ikoner
- [ ] Implementera responsiv footer-layout

---

### Fas 3: Directory-Specifika Komponenter
**Mål**: Bygga komponenter för directory-funktionalitet

#### Steg 3.1: Filtreringssystem
- [ ] Skapa filter-sidebar med kategorifilter
- [ ] Implementera Basecoat UI's Checkbox och Radio-komponenter
- [ ] Använd Datastar för reaktiv filtrering:
  ```html
  <div data-signals='{"filters": {"category": "all", "price": "any"}}'>
    <input type="checkbox"
           data-model="filters.category"
           data-on:change="$$get('/api/listings')">
  </div>
  ```
- [ ] Lägg till prisintervall-slider
- [ ] Skapa sökfunktion med live-search

#### Steg 3.2: Listningsvisning (Cards)
- [ ] Designa listningskort med Basecoat UI's Card-komponent
- [ ] Visa bild, titel, beskrivning, pris
- [ ] Lägg till favorit-knapp (hjärta)
- [ ] Implementera hover-effekter
- [ ] Skapa grid-layout för kort (responsive)

```html
<!-- Exempel: Directory Card -->
<div class="basecoat-card"
     data-signals='{"liked": false}'>
  <img src="..." alt="...">
  <h3 data-text="listing.title"></h3>
  <p data-text="listing.description"></p>
  <button data-on:click="liked = !liked"
          data-class:text-red-500="liked">
    ♥
  </button>
</div>
```

#### Steg 3.3: Sortering & Pagination
- [ ] Skapa sorteringsmeny (pris, datum, popularitet)
- [ ] Implementera Basecoat UI's Select/Dropdown
- [ ] Använd Datastar för att uppdatera sortering:
  ```html
  <select data-model="sort"
          data-on:change="$$get('/api/listings?sort=' + sort)">
    <option value="price_asc">Pris (låg-hög)</option>
    <option value="price_desc">Pris (hög-låg)</option>
  </select>
  ```
- [ ] Implementera pagination med Basecoat UI
- [ ] Lägg till "Load More" knapp med Datastar

---

### Fas 4: Detaljsida för Listningar
**Mål**: Skapa en dedikerad sida för varje listning

#### Steg 4.1: Layout för Detaljsida
- [ ] Skapa hero-sektion med stor bild
- [ ] Implementera bildgalleri/carousel med Basecoat UI
- [ ] Designa informationssektion
- [ ] Lägg till karta (t.ex. Leaflet eller Google Maps)

#### Steg 4.2: Interaktiva Element
- [ ] Kontaktformulär med Basecoat UI's Form-komponenter
- [ ] Validering med Datastar:
  ```html
  <form data-signals='{"email": "", "message": ""}'
        data-on:submit="$$post('/api/contact')">
    <input data-model="email"
           type="email"
           required>
    <textarea data-model="message"></textarea>
  </form>
  ```
- [ ] "Dela"-knappar (social media)
- [ ] Relaterade listningar-sektion

---

### Fas 5: Realtidsuppdateringar med Datastar SSE
**Mål**: Implementera Server-Sent Events för live-updates

#### Steg 5.1: SSE för Nya Listningar
- [ ] Sätt upp SSE-endpoint i backend (`/api/sse/listings`)
- [ ] Implementera Datastar SSE-anslutning:
  ```html
  <div data-on:load="$$get('/api/sse/listings')">
    <!-- Innehåll uppdateras automatiskt -->
  </div>
  ```
- [ ] Visa notifikation när ny listning läggs till
- [ ] Använd Basecoat UI's Alert/Toast för notifikationer

#### Steg 5.2: Live Sökresultat
- [ ] Implementera debounced search med Datastar
- [ ] Uppdatera resultat i realtid medan användaren skriver
- [ ] Visa laddningsindikator (Basecoat UI Spinner)

---

### Fas 6: Användarinteraktion & State Management
**Mål**: Hantera användarens state och preferenser

#### Steg 6.1: Favoriter/Bookmarks
- [ ] Skapa favoritlista med Datastar signals:
  ```html
  <div data-signals='{"favorites": []}'>
    <button data-on:click="favorites.push(listingId)">
      Lägg till favorit
    </button>
  </div>
  ```
- [ ] Spara favoriter i localStorage eller backend
- [ ] Visa favoritlista på separat sida
- [ ] Synkronisera med backend om användare är inloggad

#### Steg 6.2: Dark Mode Toggle
- [ ] Implementera dark mode-växling
- [ ] Använd Datastar för att hantera tema-state
- [ ] Spara preferens i localStorage
- [ ] Använd Basecoat UI's färgschema för dark mode

---

### Fas 7: Optimering & Tillgänglighet
**Mål**: Förbättra prestanda och tillgänglighet

#### Steg 7.1: Prestanda
- [ ] Optimera bilder (lazy loading)
- [ ] Implementera Datastar's `data-intersect` för lazy loading:
  ```html
  <img data-intersect="$$get('/api/image')"
       src="placeholder.jpg">
  ```
- [ ] Minimera CSS och JS
- [ ] Implementera caching-strategi
- [ ] Testa laddningstider (Lighthouse)

#### Steg 7.2: Tillgänglighet (A11y)
- [ ] Validera ARIA-attribut på alla komponenter
- [ ] Säkerställ tangentbordsnavigering
- [ ] Testa med skärmläsare
- [ ] Verifiera färgkontrast (WCAG AA)
- [ ] Lägg till fokusindikatorer

#### Steg 7.3: SEO
- [ ] Meta-taggar för alla sidor
- [ ] Strukturerad data (Schema.org för Directory)
- [ ] Semantisk HTML
- [ ] Sitemap.xml
- [ ] robots.txt

---

### Fas 8: Responsiv Design & Cross-Browser Testing
**Mål**: Säkerställa att sidan fungerar på alla enheter

#### Steg 8.1: Responsiv Design
- [ ] Testa på mobil (320px, 375px, 414px)
- [ ] Testa på tablet (768px, 1024px)
- [ ] Testa på desktop (1280px, 1920px)
- [ ] Verifiera touch-gester på mobil
- [ ] Optimera navigation för mobil

#### Steg 8.2: Cross-Browser Testing
- [ ] Testa i Chrome
- [ ] Testa i Firefox
- [ ] Testa i Safari
- [ ] Testa i Edge
- [ ] Fixa browser-specifika buggar

---

## 🔧 Backend-Plan (Översikt)

### Fas 9: Backend Setup med Neon Postgres
**Mål**: Sätta upp backend och databas

#### Steg 9.1: Neon Databas Setup
- [ ] Skapa Neon-konto på neon.com
- [ ] Skapa nytt Postgres-projekt
- [ ] Konfigurera connection string
- [ ] Sätt upp miljövariabler (.env)

#### Steg 9.2: Databasschema
```sql
-- Exempel: Listings-tabell
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(100),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE favorites (
  user_id INT REFERENCES users(id),
  listing_id INT REFERENCES listings(id),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, listing_id)
);
```

#### Steg 9.3: API Endpoints
- [ ] `GET /api/listings` - Hämta alla listningar (med filtrering)
- [ ] `GET /api/listings/:id` - Hämta specifik listning
- [ ] `POST /api/listings` - Skapa ny listning (admin)
- [ ] `PUT /api/listings/:id` - Uppdatera listning (admin)
- [ ] `DELETE /api/listings/:id` - Ta bort listning (admin)
- [ ] `GET /api/categories` - Hämta alla kategorier
- [ ] `POST /api/favorites` - Lägg till favorit
- [ ] `GET /api/sse/listings` - SSE för realtidsuppdateringar

#### Steg 9.4: Server-Side Rendering
- [ ] Implementera HTML-rendering i backend
- [ ] Använd templates (Go: html/template, Python: Jinja2, Node: EJS)
- [ ] Rendera Datastar-attribut i HTML
- [ ] Implementera fragment-rendering för AJAX-uppdateringar

---

## 📦 Teknisk Stack Sammanfattning

### Frontend
- **Reaktivitet**: Datastar.dev (~10KB, inga dependencies)
- **Styling**: Basecoat UI + Tailwind CSS
- **Kommunikation**: Server-Sent Events (SSE) + AJAX

### Backend (Välj en)
- **Alternativ 1**: Go + Fiber/Echo + html/template
- **Alternativ 2**: Python + FastAPI + Jinja2
- **Alternativ 3**: Node.js + Express + EJS
- **Alternativ 4**: PHP + Laravel/Symfony + Blade/Twig

### Databas
- **Neon Serverless Postgres**
- **ORM**: Gorm (Go), SQLAlchemy (Python), Prisma (Node)

### Hosting
- **Frontend/Backend**: Vercel, Fly.io, Railway, eller Render
- **Databas**: Neon (auto-scaling, serverless)
- **CDN**: Cloudflare eller hosting-provider's CDN

---

## 🚀 Deployment-Plan

### Steg 10: Deployment
- [ ] Konfigurera production environment
- [ ] Sätt upp CI/CD (GitHub Actions)
- [ ] Deploya backend till hosting-plattform
- [ ] Koppla Neon database
- [ ] Konfigurera domän och SSL
- [ ] Sätt upp monitoring (Sentry, LogRocket)
- [ ] Konfigurera backup-strategi för databas

---

## 📊 Tidsskattning

| Fas | Uppskattad Tid | Prioritet |
|-----|----------------|-----------|
| Fas 1: Setup | 4-6 timmar | Hög |
| Fas 2: Layout | 8-12 timmar | Hög |
| Fas 3: Directory-komponenter | 16-20 timmar | Hög |
| Fas 4: Detaljsida | 8-12 timmar | Medium |
| Fas 5: SSE & Realtid | 6-8 timmar | Medium |
| Fas 6: State Management | 4-6 timmar | Medium |
| Fas 7: Optimering | 8-10 timmar | Hög |
| Fas 8: Testing | 6-8 timmar | Hög |
| Fas 9: Backend | 12-16 timmar | Hög |
| Fas 10: Deployment | 4-6 timmar | Hög |
| **Total** | **76-104 timmar** | |

---

## 🎨 Design-Riktlinjer

### Färgschema (Basecoat UI Standard)
- Använd Tailwind's standardpalett
- Implementera dark mode med `dark:` prefix
- Konsekvent användning av primary/secondary färger

### Typografi
- Headings: Tailwind's font-size scale
- Body: 16px bas (rem-units)
- Line height: 1.5 för body, 1.2 för headings

### Spacing
- Använd Tailwind's spacing-scale (4px increment)
- Konsekvent padding/margin

---

## 📝 Nästa Steg

1. **Välj backend-ramverk** baserat på team's expertis
2. **Sätt upp utvecklingsmiljö** (Fas 1)
3. **Skapa mockups/wireframes** för directory-sidan
4. **Börja med Fas 2** (Layout) efter setup är klar
5. **Iterera och testa** kontinuerligt

---

## 🔗 Resurser

- [Datastar Documentation](https://data-star.dev/)
- [Basecoat UI Components](https://basecoatui.com/)
- [Neon Postgres Docs](https://neon.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDN Web Docs - SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

---

**Skapad**: 2025-11-18
**Version**: 1.0
