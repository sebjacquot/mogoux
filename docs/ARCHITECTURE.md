# Architecture — Webdocumentaire *Mémoires Ouvrières*

## Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework frontend + routing | **Next.js** (App Router) | 15.x |
| CMS headless | **PayloadCMS** | 3.x |
| Base de données | **PostgreSQL** | 15 |
| Styles | **TailwindCSS** | 3.x |
| Langage | **TypeScript** | 5.7 |
| Runtime | **Node.js** | ≥ 20 |
| Traitement d'images | **Sharp** | 0.32 |
| Export/import données | **ExcelJS** | 4.x |

---

## Principe clé : un seul serveur

La décision architecturale la plus importante du projet est de faire **cohabiter Next.js et PayloadCMS dans un seul processus Node.js**, sur un seul port.

Dans beaucoup de projets, Next.js (frontend) et un CMS tournent sur deux serveurs séparés et communiquent via HTTP. Ici, ce n'est pas le cas : les deux sont montés ensemble grâce au wrapper `withPayload()` dans `next.config.mjs`.

**Avantages concrets :**
- Les pages serveur accèdent directement à la base de données via `getPayload()`, sans faire de requête HTTP. C'est plus rapide et plus simple.
- Un seul processus à gérer, un seul port, un seul déploiement.
- Pas de problème de CORS entre frontend et CMS.

**Comment ça marche :**
```
Requête HTTP → Next.js 15
                    ├── /admin/** → PayloadCMS Admin UI
                    ├── /api/**   → PayloadCMS REST + GraphQL API
                    └── /**       → Pages publiques du site
                              ↓
                        PostgreSQL (accès direct via SDK Payload)
```

---

## Route Groups (organisation du code)

Next.js 15 App Router utilise des **route groups** (dossiers entre parenthèses) pour organiser les routes sans que les parenthèses apparaissent dans l'URL.

### `(payload)/` — Espace CMS

Toutes les routes de PayloadCMS. Ce groupe a son propre `layout.tsx` sans Header ni Footer du site.

```
/admin          → Interface d'administration
/api/[...slug]  → API REST (CRUD collections)
/api/graphql    → API GraphQL
```

### `(site)/` — Site public

Toutes les pages accessibles aux visiteurs. Ce groupe a un `layout.tsx` qui ajoute automatiquement le `Header` et le `Footer` sur chaque page.

```
/                          → Page d'accueil
/navigation                → Page de navigation
/chapitres                 → Listing des chapitres
/chapitres/biographie      → Biographie de Jean-Paul Goux
/chapitres/chapitre1       → Chapitre 1 (jusqu'à chapitre9)
/carte                     → Carte interactive des lieux
/documentaire              → Lecteur du film documentaire
/documents/[slug]          → Page de détail d'un document d'archive
/lieux-reference/[slug]    → Page d'un lieu de référence géographique
/thematiques               → Listing des thématiques
/thematiques/[slug]        → Page de détail d'une thématique
/annexe/equipe             → L'équipe du projet
/annexe/partenaires        → Les partenaires
/annexe/presentation_projet → Présentation du projet
/annexe/mentions_legales   → Mentions légales
```

---

## Flux des données

### Pages serveur (Server Components)

La grande majorité des pages sont des **Server Components** : elles sont rendues côté serveur au moment de la requête. Elles accèdent directement à PostgreSQL via le SDK Payload, sans passer par l'API HTTP.

```typescript
// Exemple typique dans une page (site)/chapitres/chapitre1/page.tsx
import { getPayload } from '@/utils/payload'

export default async function Chapitre1Page() {
  const payload = await getPayload()
  const sections = await payload.find({ collection: 'sections', ... })
  // → données disponibles, pas de fetch, pas d'état client
  return <div>...</div>
}
```

### Composants client (Client Components)

Certains composants nécessitent de l'interactivité (état, événements DOM, APIs navigateur). Ils sont marqués `'use client'` et s'exécutent dans le navigateur. Les données leur sont passées en props depuis les Server Components parents.

```
Server Component (page)
  └── récupère les données depuis PostgreSQL
        └── passe les données en props
              └── Client Component (ex: CarteMap, Carousel)
                    └── gère l'interactivité dans le navigateur
```

### Route `/img/[id]`

Une route API spéciale (`app/img/[id]/route.ts`) sert de **proxy pour les images PayloadCMS**. Quand une image est uploadée dans Payload, son URL passe par cette route qui sert le fichier depuis `public/medias/` ou `public/documents/`.

---

## Structure du dépôt

```
mogoux/                         ← Racine du projet (dépôt Git)
│
├── app/                        ← Application Next.js + PayloadCMS
│   ├── src/                    ← Tout le code TypeScript/React
│   │   ├── app/                ← Routes Next.js (App Router)
│   │   ├── collections/        ← Schémas de données Payload
│   │   ├── components/         ← Composants React
│   │   ├── hooks/              ← Hooks Payload (logique métier CMS)
│   │   ├── migrations/         ← Migrations de base de données
│   │   ├── utils/              ← Fonctions utilitaires
│   │   ├── payload.config.ts   ← Config centrale Payload
│   │   └── payload-types.ts    ← Types TypeScript auto-générés
│   ├── public/                 ← Assets statiques servis directement
│   │   ├── images/             ← Images des chapitres et de la carte
│   │   ├── icones/             ← Logos et icônes SVG/PNG
│   │   ├── medias/             ← Médias uploadés via Payload (thématiques)
│   │   └── documents/          ← Documents d'archive uploadés via Payload
│   ├── .env.example            ← Modèle de configuration
│   ├── next.config.mjs         ← Config Next.js (basePath, withPayload)
│   ├── tailwind.config.ts      ← Thème TailwindCSS
│   ├── tsconfig.json           ← Config TypeScript
│   └── package.json            ← Dépendances et scripts
│
├── backups/                    ← Données initiales (ne pas modifier)
│   ├── 2026-03-13_export_gou-db.sql       ← Dump PostgreSQL complet
│   ├── 2026-03-13_export_medias.tar.gz    ← Archive des médias Payload
│   └── 2026-03-13_export_documents.tar.gz ← Archive des documents Payload
│
├── docs/                       ← Cette documentation
│
├── Makefile                    ← Automatisation déploiement production
└── Makefile.dev                ← Automatisation lancement local
```

---

## Diagramme des relations entre collections

```
Sections ─────────────┐
   (rubriques)         │ join
                       ▼
Thematics ─────────── related_sections (join → Sections)
   (thématiques)       │
                       │ join
                       ▼
Documents ─────────── thematics (relationship → Thematics)
   (archives)          │
                       │ relationship
                       ▼
ReferenceLocations ─── location.location_reference (relationship)
   (lieux)

Medias ──────────────── background_image (relationship depuis Thematics, ReferenceLocations)
   (fichiers image)     preview_audio_video (relationship depuis Documents)

Colors ──────────────── physical_characteristics.colors (relationship depuis Documents)
DocumentTypes ──────── physical_characteristics.document_types
MaterialTypesAndFormats ← physical_characteristics.material_types_and_formats
```

---

## Système d'URL courtes pour les médias (`/img/[id]`)

### Le problème

Quand un média est uploadé dans PayloadCMS, son URL réelle est longue et dépend du nom de fichier original :

```
/medias/GOU_04_B_08_0010-500x333.jpg           ← médias Payload
/documents/GOU_04_B_08_0010.jpg                 ← documents Payload
/images/Chapitres/Chapitre1/GOU_04_B_0015.jpg  ← images statiques
```

Si on veut référencer un média dans du contenu (ex : en base de données ou dans un lien partagé), utiliser le chemin complet est fragile : si le fichier est renommé, le lien est cassé.

### La solution : `/img/[id]`

La route `app/src/app/img/[id]/route.ts` fournit une **URL courte et stable** basée sur l'**identifiant numérique Payload** du média, indépendante du nom de fichier.

```
/img/42  →  301 redirect vers  /medias/photo-500x333.jpg
```

**Fonctionnement interne :**
1. La route reçoit l'`id` Payload du média (ex : `42`)
2. Elle appelle l'API Payload REST `/api/medias/42` pour récupérer les métadonnées
3. Elle extrait le champ `url` du média
4. Elle redirige en `301` (permanent, mis en cache un an) vers l'URL réelle

**Avantages :**
- URL courte et lisible : `/img/42` au lieu de `/medias/GOU_04_B_08_0010-500x333.jpg`
- Stable : si le fichier est re-uploadé avec un nouveau nom, l'ID reste le même
- Mise en cache navigateur agressive (`Cache-Control: public, max-age=31536000, immutable`)

**Utilisation dans le code :**
```typescript
// Plutôt que :
<img src={`${cmsBase}${media.url}`} />

// On peut utiliser :
<img src={`${base}/img/${media.id}`} />
```

> **Note :** Cette route ne fonctionne que pour les médias uploadés dans la collection `medias` de Payload. Les images statiques du dossier `public/images/` sont toujours servies directement par leur chemin.

---

## Décisions techniques notables

**Pourquoi `export const dynamic = 'force-dynamic'` sur certaines pages ?**
PayloadCMS 3 avec Next.js 15 peut tenter de mettre en cache les pages au build. Les pages qui affichent des données susceptibles de changer (documents, lieux, thématiques) sont marquées `force-dynamic` pour que Next.js les restitue à chaque requête plutôt que de les mettre en cache statique.

**Pourquoi `SlateToLexicalFeature` dans certaines collections ?**
Les données ont été initialement saisies dans une ancienne version de Payload qui utilisait l'éditeur Slate. Payload 3 utilise Lexical. Le feature `SlateToLexicalFeature` permet une migration transparente des anciens contenus vers le nouveau format.

**Pourquoi `--legacy-peer-deps` dans le Makefile.dev ?**
Certaines dépendances Payload sont encore en `latest` et peuvent présenter des conflits de version transitoires avec React 19 au moment de l'install. Le flag contourne ces conflits sans modifier les dépendances réelles.

**Pourquoi `exceljs` comme dépendance ?**
La fonctionnalité d'import/export de documents en masse depuis l'interface admin utilise ExcelJS pour lire et générer des fichiers CSV/XLSX.
