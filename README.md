# Sinke Planung — Website

Statische, SEO-optimierte Website für ein Planungsbüro in Berlin
(Schwerpunkt Geschosswohnungsbau, Gewerbe, Bildungsbau, Bestand).

- **Keine Abhängigkeiten, kein Build-Schritt.** Reines HTML/CSS/JS → schnell, stabil, überall hostbar (bestes Fundament für SEO & Core Web Vitals).
- **Mobile-first & barrierearm** (Skip-Link, Fokus-Stile, `prefers-reduced-motion`, semantisches HTML).
- **Für Suchmaschinen und KI-Suche aufbereitet** (strukturierte Daten, FAQ, Ratgeber, `llms.txt`), siehe Abschnitt 8.
- **Design nach dem taste-Skill:** ein Raster, eine Schrift (Schibsted Grotesk), die Farben des Büros, Fotos in Originalgröße.

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
| `https://bonvico.com` | endgültige Domain (bonvico.com ist die vorläufige Adresse) | alle HTML, `sitemap.xml`, `robots.txt`, `llms.txt`, `feed.xml` |
| Anschrift | echte Anschrift ergänzen (aktuell wird keine gezeigt) | `kontakt.html` (TODO-Kommentar), JSON-LD in `index.html` und `kontakt.html`, `impressum.html` |
| Telefon, E-Mail | echte Angaben ergänzen (aktuell nur das Formular) | `kontakt.html`, JSON-LD (`telephone`, `email`), `impressum.html` |
| `[ ... ]` (eckige Klammern) | echte Angaben | `impressum.html`, `datenschutz.html`, `buero.html` (Team) |
| `<!-- TODO ... -->` | Team, Anfahrt, Adresse | `buero.html` (Team), `kontakt.html` (Route planen), Footer |
| Geo-Koordinaten | mit der echten Anschrift ergänzen | JSON-LD (`geo`) in `index.html` und `kontakt.html` |
| LinkedIn/Instagram | echte Profile ergänzen (aktuell keine verlinkt) | Footer (`.socials`), JSON-LD (`sameAs`) |

**Wichtig für lokale SEO:** Name, Adresse, Telefon (**NAP**) müssen überall **identisch** sein — auch später in Verzeichnissen und im Google-Unternehmensprofil.

**Rechtstexte:** `impressum.html` und `datenschutz.html` sind Vorlagen. Bitte vor dem Launch **juristisch prüfen** lassen (Impressumspflicht nach § 5 DDG, DSGVO).

---

## 5. Fotos einsetzen

Alle Projektfotos liegen web-optimiert als **WebP** in `assets/img/projekte/` (sprechende Dateinamen, z. B.
`mehringdamm-kueche.webp`). Die ursprünglichen PNG-Uploads in `assets/img/Projekt_*/` werden von keiner Seite
mehr geladen (11,4 MB → 1 MB) und können gelöscht werden, sobald höher aufgelöste Originale vorliegen.

Neues Foto einsetzen:
1. Als WebP exportieren (oder JPG), **mindestens 1600 px breit**, für das Hero-Bild 2400 px. Dateiname klein,
   ohne Umlaute und Leerzeichen, mit Motiv und Projekt: `projektname-motiv.webp`.
2. Im `<img>`-Tag `src`, `width` und `height` (echte Pixelmaße) setzen.
3. `alt` beschreibt, was wirklich zu sehen ist, plus Projekt/Ort, z. B.
   „Sanierter Altbau-Wohnraum am Mehringdamm mit Stuck und Fischgrätparkett". Keine Keyword-Listen.

**Wichtig:** Die aktuellen Fotos sind nur 300–760 px breit und wirken groß gezeigt unscharf (vor allem das
Hero-Bild der Startseite). Bitte Originaldateien der Fotograf:innen besorgen und die Bildrechte klären;
der Bildnachweis gehört ins Impressum.

**Social-Vorschau (WhatsApp/LinkedIn):** `assets/img/og-cover.jpg` (1200×630). Bei neuem Hero-Bild neu erzeugen.

---

## 6. Inhalte ergänzen

**Neues Projekt:** in `projekte.html` einen `<article class="proj" id="kurzname">`-Block kopieren und Titel,
Kategorie und Bilder anpassen. Zusätzlich im JSON-LD derselben Seite (`ItemList`) einen Eintrag ergänzen.
Karten auf der Startseite und den Bezirksseiten verlinken auf `projekte.html#kurzname`.

**Neuer Journal-Beitrag:** eine Datei `journal-*.html` kopieren, dann anpassen:
`<title>`, Description, canonical, `og:url`, JSON-LD (`BlogPosting`: `headline`, `datePublished`,
`dateModified`; `FAQPage`), Text. Danach den Beitrag eintragen in: `journal.html` (Liste + JSON-LD `Blog`),
`sitemap.xml`, `feed.xml` und `llms.txt`.

Aufbau, der sich für Suchmaschinen und KI-Suche bewährt: Die Antwort steht im ersten Absatz, darunter ein
Kasten „Kurz gesagt", Zwischenüberschriften als Sachfragen, am Ende „Häufige Fragen" und die Quellen.
Rechtsangaben mit Stand-Datum versehen und bei Gesetzesänderungen aktualisieren (`dateModified` + `lastmod`).

**FAQ ändern:** Frage und Antwort stehen zweimal auf der Seite, sichtbar (`<details>`) und im JSON-LD
(`FAQPage`). Beide Stellen müssen wortgleich bleiben.

**Header, Navigation, Footer:** sind auf jeder Seite als HTML eingebettet. Änderungen auf allen Seiten nachziehen.

---

## 7. Kontaktformular aktivieren

Das Formular in `kontakt.html` ist **für Netlify Forms vorbereitet** und leitet nach dem Absenden auf
`danke.html` weiter.

Ohne Netlify: bei [Formspree](https://formspree.io) o. ä. einen Endpunkt anlegen und im `<form>`
`action="https://formspree.io/f/DEIN-CODE"` setzen; die Attribute `data-netlify`, `netlify-honeypot`
und das versteckte Feld `form-name` entfernen und dort `danke.html` als Weiterleitung eintragen.

---

## 8. Suchmaschinen und KI-Suche

**Bereits eingebaut**
- Pro Seite: eindeutiger `<title>` (≤ 65 Zeichen), Description (≤ 160), canonical, Open Graph, Twitter Card.
- Strukturierte Daten (JSON-LD) als verknüpfter Graph: `ProfessionalService` (Startseite, Kontakt), `WebSite`,
  `WebPage`, `BreadcrumbList`, `Service` (Leistungen, Bezirke), `FAQPage`, `ItemList` (Projekte), `Blog`/`BlogPosting`.
- `robots.txt` gibt Suchmaschinen und KI-Crawler ausdrücklich frei (GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Google-Extended u. a.). Wer das nicht möchte, entfernt die jeweilige Zeile.
- `llms.txt`: Kurzprofil des Büros mit allen wichtigen Seiten für KI-Assistenten.
- `sitemap.xml`, `feed.xml` (RSS des Journals).
- Inhalte, die sich zitieren lassen: klare Definition des Büros, Fakten in ganzen Sätzen, FAQ mit
  eigenständigen Antworten, Ratgeber mit Quellen und Stand-Datum.
- Technik: Bilder als WebP mit festen Maßen, Hero-Bild vorgeladen, kein Layout-Sprung, kein Webfont,
  Inhalte ohne JavaScript sichtbar. `netlify.toml` setzt Cache- und Sicherheits-Header.

**Nach dem Launch (das bringt am meisten)**
1. **Platzhalter aus Abschnitt 4 ersetzen** (Domain, Adresse, Telefon, E-Mail, Social-Links, Geo-Koordinaten im JSON-LD).
2. **Google Search Console** und **Bing Webmaster Tools** einrichten, `sitemap.xml` einreichen.
   Bing ist die Quelle für ChatGPT-Suche und Copilot, also nicht auslassen.
3. **Google Unternehmensprofil** anlegen: exakt dieselbe Schreibweise von Name, Adresse, Telefon (NAP).
4. **Einheitliche Einträge** in Verzeichnissen und Portalen, immer dieselbe NAP. KI-Suche stützt sich stark
   auf Erwähnungen auf fremden Seiten.
5. **Team mit Namen und Qualifikation** auf `buero.html` ergänzen (TODO-Kommentar dort) und im Journal
   Autor:innen nennen.
6. **Bewertungen** von Bauherr:innen einholen; **Backlinks** von Partnern, Bauherren und Fachpresse.
7. **Journal pflegen**: neue Beiträge und aktualisierte Rechtsstände halten die Seite frisch.

---

## 9. Struktur

```
├── index.html                  Startseite (Büro-Definition, Fakten, Leistungen, Referenzen, FAQ)
├── leistungen.html             4 Leistungen, Ablauf, FAQ
├── leistungsphasen-hoai.html   Ratgeber: Leistungsphasen 1 bis 9 der HOAI mit Anteilen und Kosten
├── projekte.html               7 Referenzprojekte mit allen Bildern (Lightbox)
├── planung-*.html              Bezirksseiten: Prenzlauer Berg, Charlottenburg, Zehlendorf, Mitte
├── buero.html                  Büro, Haltung (Team: TODO)
├── journal.html                Übersicht der Ratgeber
├── journal-*.html              5 weitere Ratgeber-Beiträge
├── kontakt.html  danke.html    Kontakt mit Formular, Bestätigungsseite (noindex)
├── partner.html                Netzwerk der Fachplaner
├── impressum.html  datenschutz.html   Rechtstexte (Vorlagen, prüfen lassen!)
├── 404.html
├── sitemap.xml  robots.txt  llms.txt  feed.xml  site.webmanifest  favicon.ico  netlify.toml
└── assets/
    ├── system.css  system.js   Baukasten des taste-Skills (Raster, Schrift, Buttons, Navigation, Formular)
    ├── layout/ motion/ ui/ moments/   weitere Teile des Baukastens (Hero, Hover, Karten, Textmoment)
    ├── site.css                eigene Regeln: Schrift, Farben des Büros, Unterseiten, Artikel
    ├── fonts/                  Schibsted Grotesk, lokal ausgeliefert (kein Abruf bei Google)
    └── img/projekte/           Projektfotos (WebP); dazu Favicon, Icons, og-cover.jpg
```

**Design:** Die Seiten sind mit dem Baukasten des [taste-Skills](https://github.com/Leonxlnx/taste-skill)
(tasteskill 2.5.1, MIT-Lizenz) gebaut. Die Startseite folgt seinem Raster streng (ein Abschnitt pro
Bildschirm); auf den Unterseiten fließen die Abschnitte frei, weil lange Texte nicht in dieses Raster passen.
Die Dateien des Baukastens (`system.css`, `system.js`, `layout/`, `motion/`, `ui/`, `moments/`) nicht von Hand
ändern; eigene Anpassungen gehören in `assets/site.css`. Farben und Schrift stehen dort im `:root`-Block.
Fotos werden höchstens in ihrer Originalgröße gezeigt, damit sie scharf bleiben.
