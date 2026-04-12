# Système de styles

Le projet utilise **TailwindCSS 3** comme framework de styles, complété par des classes CSS globales définies dans `globals.css`.

---

## Couleurs

Définies dans `tailwind.config.ts` sous `theme.extend.colors` :

| Nom Tailwind | Valeur | Usage |
|-------------|--------|-------|
| `primary` | `#161616` | Couleur de fond principale (quasi-noir) — utilisée pour le fond du site |
| `secondary` | `#f3f3f3` | Couleur de texte principale (quasi-blanc) — textes sur fond sombre |
| `ouvrier` | `#ff7979` | Rouge corail — accents, tags "CHAPITRE X" |
| `article` | `hsl(0,0%,96%)` | Fond des pages d'articles (blanc cassé légèrement gris) |
| `legende` | `#616161` | Gris moyen — couleur des légendes d'images |
| `site-text` | `#e8e6e3` | Blanc cassé légèrement chaud — paragraphes du site |
| `nav` | `#242424` | Fond de la barre de navigation |
| `navigation` | `#e22b40` | Rouge vif — couleur d'accentuation de la page de navigation |
| `nav-dark` | `#1a1a1a` | Fond foncé pour variante de nav |

**Exemples d'utilisation :**
```tsx
<div className="bg-primary text-secondary">  {/* fond noir, texte blanc */}
<span className="text-ouvrier">CHAPITRE 1</span>  {/* tag rouge corail */}
<p className="text-site-text">Paragraphe</p>  {/* texte légèrement chaud */}
```

---

## Polices

Définies dans `tailwind.config.ts` sous `theme.extend.fontFamily` :

| Nom Tailwind | Police CSS | Usage |
|-------------|-----------|-------|
| `font-graphik` | Graphik, sans-serif | Titres principaux |
| `font-helvetica` | Helvetica Neue, Helvetica, Arial | Interface, navigation |
| `font-times` | Times New Roman, Times | Textes littéraires, citations |
| `font-merriweather` | Merriweather, serif | Corps de texte long |
| `font-inter` | Inter, sans-serif | UI générale, page d'accueil |

> **Note :** Les polices `Graphik` et `Inter` doivent être chargées via CSS ou Next.js Font. Vérifier `globals.css` ou `layout.tsx` pour leur import.

---

## Classes CSS globales (`globals.css`)

Ces classes sont définies dans `@layer components` et peuvent être utilisées dans tout le projet comme n'importe quelle classe Tailwind.

### Classes de chapitre (pages `/chapitres/*`)

| Classe | Usage |
|--------|-------|
| `.chapter-entete` | Section hero plein écran avec image de fond (utilise `background-image`) |
| `.chapter-overlay` | Calque sombre semi-transparent par-dessus l'image hero |
| `.chapter-hero` | Conteneur centré du contenu dans le hero |
| `.chapter-tag` | Badge de tag rouge au-dessus du titre (ex : `CHAPITRE 1`) |
| `.chapter-titre` | Titre H1 blanc du chapitre |
| `.chapter-soustitre` | Sous-titre H2 blanc du chapitre |

**Exemple d'utilisation dans une page chapitre :**
```tsx
<section
  className="chapter-entete"
  style={{ backgroundImage: `url(${base}/images/Header_Chapitre/C1_image.jpg)` }}
>
  <div className="chapter-overlay" />
  <div className="chapter-hero">
    <span className="chapter-tag">CHAPITRE 1</span>
    <h1 className="chapter-titre">Titre du chapitre</h1>
    <h2 className="chapter-soustitre">Sous-titre</h2>
  </div>
</section>
```

### Classes d'article (corps de page)

| Classe | Usage |
|--------|-------|
| `.article-content` | Wrapper principal du contenu (max-width centré, paddings) |
| `.article-section-title` | Titre H2 d'une section dans le corps de l'article |
| `.article-paragraph` | Paragraphe avec marges verticales standards |
| `.article-image` | Image insérée dans le corps de l'article (responsive) |

### Classes de crédits

| Classe | Usage |
|--------|-------|
| `.credits-section` | Section de crédits en bas de page (fond légèrement distinct) |
| `.credits-inner` | Contenu des crédits (centré, police plus petite) |

### Classes de suggestions

| Classe | Usage |
|--------|-------|
| `.suggestions-tag` | Titre "Suggestions" ou "Voir aussi" |
| `.suggestions-section` | Grille de 3 cartes de suggestions |

---

## Conventions de styles

### Images statiques avec `basePath`

Toutes les images du dossier `public/` doivent utiliser `NEXT_PUBLIC_BASE_PATH` pour fonctionner que le site soit à la racine ou dans un sous-répertoire :

```typescript
const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

<img src={`${base}/images/Header_Chapitre/C1_image.jpg`} />
```

### Médias Payload avec `serverUrl`

Les médias uploadés dans PayloadCMS utilisent une URL construite depuis `NEXT_PUBLIC_SERVER_URL` :

```typescript
const cmsBase = process.env.NEXT_PUBLIC_SERVER_URL || ''

// Via l'URL réelle du fichier :
<img src={`${cmsBase}${media.url}`} />

// Ou via la route courte /img/[id] :
<img src={`${base}/img/${media.id}`} />
```

### Responsive Design

Le site utilise le breakpoint `md` (768px) comme point de bascule principal entre mobile et desktop. Exemple de la page d'accueil :
```tsx
<div className="flex flex-col md:flex-row">  {/* colonne sur mobile, rangée sur desktop */}
```

### Plugin Typography

Le plugin `@tailwindcss/typography` est installé. Il fournit la classe `prose` pour styliser du HTML généré (ex : contenu Lexical converti en HTML) :
```tsx
<div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
```

---

## Styles de l'interface admin (`custom.scss`)

Le fichier `src/app/(payload)/(payload)/custom.scss` permet de surcharger les styles de l'interface d'administration PayloadCMS (couleurs, polices, espacements du dashboard). Il est importé automatiquement par le layout admin de Payload.
