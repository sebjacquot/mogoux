# Structure du code source — `app/src/`

Ce document décrit le rôle de chaque fichier et dossier dans `app/src/`.

---

## Vue d'ensemble

```
app/src/
├── app/               → Routes Next.js (pages + API)
├── collections/       → Schémas de données PayloadCMS
├── components/        → Composants React réutilisables
├── hooks/             → Hooks Payload (logique métier côté CMS)
├── migrations/        → Migrations de base de données
├── utils/             → Fonctions utilitaires partagées
├── payload.config.ts  → Configuration centrale de PayloadCMS
└── payload-types.ts   → Types TypeScript générés automatiquement
```

---

## `app/src/app/`

Le cœur du routage Next.js 15 (App Router). Chaque dossier = une route ou un groupe de routes.

### Fichiers racine

| Fichier | Rôle |
|---------|------|
| `globals.css` | Styles CSS globaux. Contient les classes `.chapter-*`, `.article-*`, etc. définies dans `@layer components`. Voir [`STYLES.md`](./STYLES.md) pour le détail. |
| `layout.tsx` | Layout racine de l'application. Ne contient que la structure minimale commune (balise `<html>`). Les layouts enfants ajoutent Header/Footer selon le context. |

### `img/[id]/route.ts`

Route API qui fournit des **URL courtes pour les médias Payload**. Prend l'ID numérique d'un média et redirige (301) vers son URL réelle. Voir la section dédiée dans [`ARCHITECTURE.md`](./ARCHITECTURE.md).

```
GET /img/42  →  301  →  /medias/photo-originale.jpg
```

### `(payload)/` — Routes PayloadCMS

Ce groupe a son propre `layout.tsx` (sans Header/Footer du site). Toutes ces routes sont gérées automatiquement par le package `@payloadcms/next`.

```
(payload)/
├── (payload)/admin/[[...segments]]/
│   ├── page.tsx         → Interface d'administration PayloadCMS
│   └── not-found.tsx    → Page 404 dans l'espace admin
├── (payload)/api/[...slug]/route.ts        → API REST Payload
├── (payload)/api/graphql/route.ts          → API GraphQL Payload
├── (payload)/api/graphql-playground/route.ts → GraphQL Playground
├── custom.scss          → Styles CSS injectés dans l'interface admin
└── layout.tsx           → Layout admin (sans Header/Footer public)
```

> La structure `(payload)/(payload)/` avec deux niveaux est générée automatiquement par PayloadCMS. C'est volontaire, ne pas modifier.

### `(site)/` — Pages publiques

Ce groupe partage un `layout.tsx` qui ajoute automatiquement `<Header>` et `<Footer>` à toutes les pages.

```
(site)/
├── layout.tsx            → Ajoute Header + Footer, définit les métadonnées SEO globales
├── page.tsx              → Page d'accueil (split-screen : texte à gauche, image à droite)
│
├── chapitres/
│   ├── page.tsx          → Listing des 9 chapitres + biographie
│   ├── biographie/page.tsx  → Biographie de Jean-Paul Goux
│   ├── chapitre1/page.tsx   → Chapitre 1
│   ├── chapitre2/page.tsx   → Chapitre 2
│   │   … (jusqu'à chapitre9)
│
├── carte/page.tsx        → Carte interactive des lieux de référence
├── documentaire/page.tsx → Lecteur du film documentaire avec chapitrage
│
├── documents/[slug]/page.tsx
│   → Détail d'un document d'archive (image, audio ou vidéo + métadonnées complètes)
│
├── lieux-reference/[slug]/page.tsx
│   → Page d'un lieu de référence avec description, citation et galerie de documents
│
├── navigation/page.tsx   → Page de navigation générale (portail d'entrée du site)
│
├── thematiques/
│   ├── page.tsx          → Listing de toutes les thématiques
│   └── [slug]/page.tsx   → Détail d'une thématique (galerie de documents associés)
│
└── annexe/
    ├── equipe/page.tsx
    ├── partenaires/page.tsx
    ├── presentation_projet/page.tsx
    └── mentions_legales/page.tsx
```

---

## `app/src/collections/`

Définit les **schémas de la base de données** PayloadCMS. Chaque fichier = une table PostgreSQL.
Voir [`COLLECTIONS.md`](./COLLECTIONS.md) pour le détail complet de chaque collection.

| Fichier | Slug | Table principale |
|---------|------|-----------------|
| `Documents.ts` | `documents` | `documents` |
| `Sections.ts` | `sections` | `sections` |
| `Thematics.ts` | `thematics` | `thematics` |
| `ReferenceLocations.ts` | `reference-locations` | `reference_locations` |
| `Medias.ts` | `medias` | `medias` |
| `MetadataFiles.ts` | `metadata-files` | `metadata_files` |
| `DocumentTypes.ts` | `document-types` | `document_types` |
| `MaterialTypesAndFormats.ts` | `material-types-and-formats` | `material_types_and_formats` |
| `Colors.ts` | `colors` | `colors` |
| `Users.ts` | `users` | `users` |

---

## `app/src/components/`

Composants React partagés. Voir [`COMPONENTS.md`](./COMPONENTS.md) pour le détail.

```
components/
├── Header.tsx              → Navigation principale + burger mobile  [client]
├── Footer.tsx              → Pied de page avec logos partenaires    [serveur]
├── Audio.tsx               → Lecteur audio HTML5 personnalisé       [client]
├── Video.tsx               → Lecteur vidéo HTML5                    [client]
├── Carousel.tsx            → Carrousel d'images                     [client]
├── Gallery.tsx             → Grille photos + lightbox               [client]
├── GalleryItem.tsx         → Élément d'une galerie                  [serveur]
├── CarteMap.tsx            → Carte interactive (pins cliquables)    [client]
├── DocumentairePlayer.tsx  → Lecteur vidéo avec chapitrage          [client]
├── LieuReferencePage.tsx   → Toggle description/citation            [client]
├── ImageFullscreen.tsx     → Image avec mode plein écran            [client]
├── ImageTooltip.tsx        → Image avec légende au survol           [client]
├── Details.tsx             → Bloc de métadonnées d'un document      [serveur]
├── DocumentNav.tsx         → Navigation interne page document       [serveur]
├── Return.tsx              → Bouton retour arrière                  [serveur]
├── Sections.tsx            → Rendu d'une liste de sections          [serveur]
├── SuggestionsCard.tsx     → Carte de suggestion en bas de page     [serveur]
└── cms/                    → Composants de l'interface admin
    ├── AdminLogo.tsx
    ├── AdminIcon.tsx
    ├── AdminDashboard.tsx
    ├── DocumentsActions.tsx
    ├── ExportAllDocumentsButton.tsx
    ├── ExportTemplateButton.tsx
    ├── ImportButton.tsx
    └── importDocumentsFrom/
        ├── ImportDocumentsForm.tsx
        ├── ImportDocumentsFormView.tsx
        └── ImportDocumentsForm.css
```

---

## `app/src/hooks/`

### `checkSlug.ts`

Hook Payload déclenché **avant la validation** lors de la création ou modification d'un document. Il génère automatiquement un slug unique à partir du titre.

**Logique :**
1. Prend le champ `slug` (si renseigné) ou le `title` / `identification.title` comme base
2. Formate la chaîne : supprime les espaces, remplace par des tirets, supprime les caractères spéciaux
3. Vérifie en base si ce slug existe déjà
4. Si oui, ajoute un suffixe `-2`, `-3`, etc. jusqu'à trouver un slug libre
5. Retourne le slug unique

**Utilisé dans :** `Documents`, `Thematics`, `ReferenceLocations`

---

## `app/src/migrations/`

Les migrations décrivent les changements de structure de la base de données. PayloadCMS les génère automatiquement avec `npm run migrate:create` et les exécute dans l'ordre chronologique via `npm run migrate`.

| Fichier | Rôle |
|---------|------|
| `20250404_082533.ts` | Migration principale : crée/modifie les tables PostgreSQL selon les collections |
| `20250404_082533.json` | Snapshot JSON de l'état de la DB au moment de la migration (référence pour Payload) |
| `index.ts` | Exporte toutes les migrations pour que Payload les découvre automatiquement |

**Quand créer une nouvelle migration ?** À chaque fois qu'on modifie le schéma d'une collection (ajout/suppression de champ, changement de type, nouvelle relation).

```bash
cd app && npm run migrate:create   # génère les fichiers de migration
cd app && npm run migrate          # applique les migrations en attente
```

---

## `app/src/utils/`

### `payload.ts` — Singleton `getPayload()`

Initialise la connexion à PayloadCMS **une seule fois** et la met en cache. Sans ce singleton, chaque requête recréerait une connexion à la base, ce qui serait très lent.

```typescript
// Usage dans n'importe quelle page serveur :
import { getPayload } from '@/utils/payload'

const payload = await getPayload()
const docs = await payload.find({ collection: 'documents', ... })
```

### `renderLexical.ts` — Convertisseur Lexical → HTML

PayloadCMS 3 stocke les contenus riches (descriptions, citations) au format **JSON Lexical** — un arbre de nœuds décrivant la structure du texte. Cette fonction convertit cet arbre en HTML pour l'affichage.

**Formats gérés :**
- Paragraphes
- Gras (`format & 1`)
- Italique (`format & 2`)
- Souligné (`format & 4`)
- Barré (`format & 8`)

```typescript
import { renderLexicalToHTML } from '@/utils/renderLexical'

// Dans une page serveur :
const html = renderLexicalToHTML(doc.description)
// → "<p>Texte avec <strong>gras</strong> et <i>italique</i></p>"

// Dans le JSX :
<div dangerouslySetInnerHTML={{ __html: html }} />
```

> **Sécurité :** `dangerouslySetInnerHTML` est sûr ici car le HTML est généré côté serveur depuis des données Payload contrôlées, pas depuis une saisie utilisateur externe.

---

## `app/src/payload.config.ts`

Le fichier de **configuration centrale** de PayloadCMS. C'est ici que tout est connecté.

**Ce qu'il configure :**
- Toutes les **collections** enregistrées
- L'**adaptateur PostgreSQL** (`@payloadcms/db-postgres`)
- L'**éditeur Lexical** pour les champs rich text
- Les **langues** de l'admin (français et anglais)
- La **personnalisation visuelle** de l'admin : logo, icône, dashboard personnalisé, vue d'import custom
- La **génération des types TypeScript** (vers `payload-types.ts`)
- Le **secret JWT** (`PAYLOAD_SECRET`) et les règles CORS/CSRF

---

## `app/src/payload-types.ts`

Fichier **généré automatiquement** par la commande `npm run generate:types`. Ne jamais le modifier manuellement — les changements seraient écrasés à la prochaine génération.

Il contient les interfaces TypeScript de toutes les collections, ce qui permet l'autocomplétion et la vérification de types dans tout le code.

```bash
# Régénérer après modification d'une collection :
cd app && npm run generate:types
```

---

## `app/next.config.mjs`

Configuration de Next.js. Points importants :

- **`withPayload(nextConfig)`** : wrappe la config Next.js pour intégrer PayloadCMS (routes admin, API, etc.)
- **`basePath`** : lu depuis `NEXT_PUBLIC_BASE_PATH`, permet de déployer le site dans un sous-répertoire (ex : `https://exemple.com/mogoux`)
- **`images.remotePatterns`** : autorise Next.js à optimiser les images servies depuis `localhost` (développement)

---

## `app/tailwind.config.ts`

Configuration TailwindCSS. Voir [`STYLES.md`](./STYLES.md) pour le détail des couleurs et polices.

---

## `app/public/`

Assets statiques servis directement par Next.js, sans traitement.

```
public/
├── images/
│   ├── Chapitres/           ← Images des pages chapitres (par chapitre + biographie)
│   │   ├── Biographie/
│   │   ├── Captures/        ← Captures d'écrans utilisées dans certains chapitres
│   │   ├── Chapitre1/ … Chapitre9/
│   │   └── copie_temp/      ← Dossier temporaire (peut être nettoyé)
│   ├── Header_Chapitre/     ← Images d'en-tête (hero) de chaque chapitre
│   ├── Documentaire/        ← Image(s) du documentaire vidéo
│   └── cover_chapitre/      ← Images de couverture des chapitres
├── icones/                  ← Logos partenaires (UMLP, ELLIADD, MSHE, RBFC) + icônes UI
├── medias/                  ← Médias uploadés via Payload (thématiques, lieux)
│                               Peuplé par : tar -xzf backups/..._medias.tar.gz
├── documents/               ← Documents d'archive uploadés via Payload
│                               Peuplé par : tar -xzf backups/..._documents.tar.gz
└── favicon.svg
```

> `medias/` et `documents/` sont vides dans le dépôt Git (`.gitignore`). Ils sont peuplés depuis les archives dans `backups/` lors du setup.
