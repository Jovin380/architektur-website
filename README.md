# Sinke Planung — Website

Statische, SEO-optimierte Website für ein Planungsbüro in Berlin
(Schwerpunkt Geschosswohnungsbau, Gewerbe, Bildungsbau, Bestand).

- **Keine Abhängigkeiten, kein Build-Schritt.** Reines HTML/CSS/JS → schnell, stabil, überall hostbar (bestes Fundament für SEO & Core Web Vitals).
- **Mobile-first & barrierearm** (Skip-Link, Fokus-Stile, `prefers-reduced-motion`, semantisches HTML).
- **Design bewusst redaktionell-architektonisch** (Raster, Haarlinien, viel Weißraum, ein zurückhaltender Ton-Akzent) — nicht im typischen „KI-Look".

---

## 1. Name

Aktuell eingesetzt: **Sinke Planung** — nachnamenbasiert, bewusst **ohne** „Architekt/Architektur" im Namen (geschützter Titel).
„Architektur/Planung" wird nur als Leistungsbegriff im Seiteninhalt für SEO genutzt, nicht im Namen. Grund: „Architekt(in)" darf nur führen, wer in der Architektenkammer eingetragen ist.

**Später:** Sobald eine in der Architektenkammer eingetragene Architekt:in das Büro führt, kann daraus „[Nachname] Architektur" werden — ohne Rebranding.

**Namen ändern:** global suchen/ersetzen (case-sensitive):
`SINKE` → dein Name, `sinke-planung.de` → deine Domain, `Planung · Berlin` bei Bedarf anpassen.
Danach `assets/img/og-cover.svg`, `assets/img/favicon.svg` und das Markenzeichen (inline-SVG im Header/Footer) anpassen.

---

## 2. Lokal ansehen

```bash
cd website
python3 -m http.server 8080
# → http://localhost:8080
```

(Einfach die HTML-Dateien doppelzuklicken geht auch, ein lokaler Server ist aber sauberer.)

---

## 3. Veröffentlichen (Hosting)

Alles statisch → überall lauffähig. Empfehlungen (alle mit kostenlosem Tarif):

- **Netlify:** Ordner `website/` auf app.netlify.com ziehen (Drag & Drop) — fertig. Oder Repo verbinden, Publish directory = `website`.
- **Vercel / Cloudflare Pages / GitHub Pages:** ebenso, Root/Publish-Verzeichnis auf `website` setzen.
- **Eigener Webspace/Render Static Site:** Inhalt von `website/` ins Web-Root laden.

Danach **eigene Domain** verbinden (z. B. `sinke-planung.de` oder `sinke.berlin`).
Die `.berlin`-Domain ist zusätzlich ein kleines lokales SEO-Signal.

---

## 4. ⚠️ Vor dem Live-Gang ersetzen (Pflicht)

Diese Platzhalter sind absichtlich klar markiert (Suche im Ordner):

| Suchen nach | Ersetzen durch | Wo |
|---|---|---|
| `https://www.sinke-planung.de` | echte Domain | alle HTML, `sitemap.xml`, `robots.txt` |
| `Beispielstraße 1` / `10115` | echte Anschrift | Footer aller Seiten, `kontakt.html`, JSON-LD, `impressum.html` |
| `+49 30 000 000` / `+49300000000` | echte Telefonnummer | Footer, `kontakt.html`, Panel, JSON-LD |
| `buero@sinke-planung.de` | echte E-Mail | überall |
| `[ ... ]` (eckige Klammern) | echte Angaben | `impressum.html`, `datenschutz.html`, `buero.html` (Team) |
| `<!-- TODO ... -->` | echte Zahlen/Karte | Kennzahlen auf `index.html`, Karte auf `kontakt.html` |
| LinkedIn/Instagram-URLs | echte Profile oder entfernen | Footer, JSON-LD |

**Wichtig für lokale SEO:** Name, Adresse, Telefon (**NAP**) müssen überall **identisch** sein — auch später in Verzeichnissen und im Google-Unternehmensprofil.

**Rechtstexte:** `impressum.html` und `datenschutz.html` sind Vorlagen. Bitte vor dem Launch **juristisch prüfen** lassen (Impressumspflicht nach § 5 DDG, DSGVO).

---

## 5. Fotos einsetzen

Aktuell stehen überall Platzhalter (`assets/img/ph-*.svg`) im Fassaden-Raster-Look.

So ersetzt du sie:
1. Fotos nach `assets/img/` legen (sprechende Namen, z. B. `treptow-hof.jpg`).
2. Im `<img>`-Tag `src` auf die neue Datei setzen und `alt` konkret formulieren
   (der `alt`-Text ist SEO-relevant — Motiv + Ort + Büro, z. B. „Innenhof Wohnquartier Berlin-Treptow, Sinke Planung").
3. `width`/`height` auf das echte Seitenverhältnis anpassen (verhindert Layout-Sprünge = besserer Core-Web-Vitals-Wert).

**Format-Tipp:** Web-optimiert exportieren (JPG/WebP, ~1600 px breit, komprimiert). Große Fotos bremsen Ladezeit und damit das Ranking.

**Für Social-Vorschauen (WhatsApp/LinkedIn):** `assets/img/og-cover.svg` durch ein **1200×630 px JPG/PNG** ersetzen und die `og:image`-/`twitter:image`-URLs auf die neue Datei zeigen lassen (viele Netzwerke rendern kein SVG).

---

## 6. Neues Projekt hinzufügen

1. Eine bestehende Projektseite kopieren, z. B.
   `cp projekt-wohnquartier-treptow.html projekt-DEINPROJEKT.html`
2. Inhalt anpassen: `<title>`, Description, **canonical + og:url**, JSON-LD (Breadcrumb + `CreativeWork`), H1, Lead, Fakten, Fließtext, Galerie, Prev/Next.
3. In `projekte.html` eine Karte ergänzen (Block `<a class="project" ... data-cat="wohnen|bildung|gewerbe|bestand">`) und den Link auf die neue Datei setzen.
4. In `sitemap.xml` eine `<url>` ergänzen und in `projekte.html` die `ItemList` im JSON-LD erweitern.

Die Filter auf `projekte.html` funktionieren über `data-cat` automatisch.

---

## 7. Kontaktformular aktivieren

Das Formular in `kontakt.html` ist **für Netlify Forms vorbereitet** — beim Hosting auf Netlify funktioniert es sofort (Einträge erscheinen im Netlify-Dashboard).

Ohne Netlify: bei [Formspree](https://formspree.io) o. ä. einen Endpunkt anlegen und im `<form>`
`action="https://formspree.io/f/DEIN-CODE"` setzen; die Attribute `data-netlify`, `netlify-honeypot`
und das versteckte Feld `form-name` können dann entfernt werden.

---

## 8. SEO-Start nach dem Launch (Checkliste)

Die Technik ist gesetzt (Meta-Tags, Open Graph, `sitemap.xml`, `robots.txt`, strukturierte Daten/Schema.org,
FAQ-Rich-Snippets, saubere Überschriften, `alt`-Texte, schnelle Ladezeit). Nach dem Launch bringt vor allem das:

1. **Google Search Console** einrichten, Domain verifizieren, `sitemap.xml` einreichen.
2. **Google Unternehmensprofil (Business Profile)** anlegen — der stärkste Hebel für ein lokales Planungsbüro:
   exakt dieselbe NAP, Kategorie „Planungsbüro/Architekt", Fotos, Öffnungszeiten, Leistungsgebiet Berlin.
3. **Bing Webmaster Tools** (analog zur Search Console).
4. **Einheitliche Einträge** in Verzeichnissen: Architektenkammer Berlin, BDA, 11880, Das Örtliche, ProvenExpert — immer dieselbe NAP.
5. **Bewertungen** von Bauherren einholen (Google-Rezensionen wirken lokal stark).
6. **Backlinks**: Projektpartner, Bauherren, Fachpresse, Wettbewerbsdatenbanken (z. B. competitionline, BauNetz) verlinken lassen.
7. **Content pflegen**: `journal.html` regelmäßig mit Fachbeiträgen füllen (Berliner Bau-Themen) — hält die Seite „frisch" und rankt auf Long-Tail-Suchen.

**Ziel-Keywords** (bereits im Text verankert): *Planungsbüro Berlin, Architekt Berlin, Wohnungsbau Berlin,
Geschosswohnungsbau, Schulbau Berlin, Gewerbebau Berlin, Sanierung Berlin* + Bezirks-Longtails.

---

## 9. Struktur

```
website/
├── index.html                       Startseite (H1, Kennzahlen, Leistungen, Projekte, FAQ)
├── leistungen.html                  4 Schwerpunkte + HOAI-Leistungsphasen 1–9
├── projekte.html                    Referenz-Raster mit Filter
├── projekt-wohnquartier-treptow.html   Projekt-Detail (Vorlage für weitere)
├── projekt-schule-lichtenberg.html
├── projekt-gewerbehof-mitte.html
├── projekt-sanierung-schoeneberg.html
├── buero.html                       Büro/Haltung/Team (E-E-A-T)
├── journal.html                     Aktuelles/Blog (laufende SEO-Inhalte)
├── kontakt.html                     NAP, Öffnungszeiten, Formular, LocalBusiness-Schema
├── impressum.html   datenschutz.html   Rechtstexte (Vorlagen — prüfen lassen!)
├── 404.html
├── sitemap.xml   robots.txt   site.webmanifest
└── assets/
    ├── css/style.css                komplettes Design-System (Design-Tokens oben)
    ├── js/main.js                   Mobile-Nav, Scroll-Reveal, Projektfilter, Lightbox
    └── img/                         Platzhalter-SVGs, Favicon, OG-Bild
```

Header und Footer sind auf jeder Seite als HTML eingebettet (bewusst kein Include/Framework —
das ist für Crawler und Ladezeit am besten). Änderst du die Navigation, passe sie auf allen Seiten an.
