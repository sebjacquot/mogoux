# Collections PayloadCMS — Schémas de données

Les collections définissent la structure de la base de données. Chaque collection correspond à une table PostgreSQL. Ce document détaille chaque collection, ses champs, ses règles d'accès et ses comportements spéciaux.

---

## Vue d'ensemble des relations

```
Sections ←──────────────────────────── Thematics.related_sections (join)
                                               │
                                               │ referenced by
                                               ▼
Documents ──── thematics ──────────────► Thematics
         └──── location.location_reference ──► ReferenceLocations
         └──── physical_characteristics
                    ├── document_types ──────► DocumentTypes
                    ├── material_types_and_formats ► MaterialTypesAndFormats
                    └── colors ───────────────► Colors
         └──── preview_audio_video ──────────► Medias

Thematics ──── background_image ────────► Medias
ReferenceLocations ── background_image ─► Medias
```

---

## `Documents` — Documents d'archive

**Slug :** `documents`
**Table PostgreSQL :** `documents`
**Fichier :** `src/collections/Documents.ts`

Collection centrale du projet. Chaque document est un fichier d'archive numérisé : image, enregistrement audio ou vidéo.

### Champs

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `reference_code` | text | ✅ | Cote d'archive (identifiant unique, ex : `GOU_04_B_08_0010`) |
| `slug` | text | ✅ | Identifiant URL unique, auto-généré depuis le titre via le hook `checkSlug` |
| `title` | text | ✅ | Intitulé du document |
| `date` | text | ✅ | Date du document (format libre) |
| `type` | select | ✅ | Type de médium : `Image`, `Video` ou `Audio` |
| `alt` | text | ✅ | Texte alternatif pour l'accessibilité |
| `credits_name` | text | ✅ | Nom du détenteur des droits |
| `credits_link` | text | ❌ | URL vers la page du détenteur des droits |
| `legend` | text | ❌ | Légende courte du document |
| `description` | textarea | ❌ | Description longue |
| `notice` | text | ❌ | Lien vers une notice externe (ex : catalogue d'archives) |
| `thematics` | relationship (many) | ❌ | Thématiques associées à ce document |
| `preview_audio_video` | upload → `medias` | ❌ | Image de vignette pour les documents audio/vidéo |
| `physical_characteristics` | group | | Groupe de champs physiques |
| `physical_characteristics.document_types` | relationship → `document-types` | ✅ | Type de document (photographie, cassette, etc.) |
| `physical_characteristics.material_types_and_formats` | relationship → `material-types-and-formats` | ❌ | Support et format physique |
| `physical_characteristics.colors` | relationship → `colors` | ❌ | Couleur ou tonalité (N&B, couleur, sépia…) |
| `location` | group | | Informations géographiques |
| `location.location_reference` | relationship → `reference-locations` | ❌ | Lieu de référence associé |
| `location.location_details` | text | ❌ | Précision sur le lieu |
| `location.location_link` | text | ❌ | URL vers une notice du lieu |

### Upload

Les fichiers sont stockés dans `public/documents/` et servis à l'URL `/documents/[filename]`.

- **Types acceptés :** images (`image/*`), audio (`audio/mpeg`, `audio/x-wav`), vidéo (`video/*`)
- **Tailles générées :** `thumbnail` (140px de large) et `preview` (500px de large) pour les images
- **Header spécial :** `Accept-Ranges: bytes` ajouté pour permettre la lecture partielle des fichiers audio sur Chrome/Edge (seek dans les MP3)

### Endpoint custom : `/api/documents/slug/:slug`

Récupère un document par son slug (au lieu de son ID numérique). Enrichit également chaque thématique associée avec sa couleur (récupérée depuis la première section liée).

```
GET /api/documents/slug/gou-04-b-08-0010
```

### Règles d'accès

- **Lecture :** publique (tous les visiteurs)
- **Création :** réservée aux utilisateurs connectés

---

## `Sections` — Rubriques de chapitre

**Slug :** `sections`
**Table PostgreSQL :** `sections`
**Fichier :** `src/collections/Sections.ts`

Les sections sont les **blocs de contenu** qui composent les pages thématiques. Elles regroupent des thématiques et définissent leur couleur d'affichage.

### Champs

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `name` | text | ✅ | Nom de la rubrique (affiché dans l'admin) |
| `rank` | number | ❌ | Ordre d'affichage (plus petit = en premier) |
| `color` | text | ✅ | Couleur CSS de la rubrique (ex : `#ff7979`) |
| `thematics` | relationship (many) → `thematics` | ❌ | Thématiques appartenant à cette rubrique |

### Règles d'accès

- **Lecture :** publique

---

## `Thematics` — Thématiques

**Slug :** `thematics`
**Table PostgreSQL :** `thematics`
**Fichier :** `src/collections/Thematics.ts`

Les thématiques sont des entrées transversales qui relient documents et lieux. Chaque thématique a une image, une description et rassemble des documents.

### Champs

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `title` | text | ✅ | Titre de la thématique |
| `slug` | text | ✅ | Identifiant URL unique, auto-généré par `checkSlug` |
| `rank` | number | ❌ | Ordre d'affichage |
| `background_image` | upload → `medias` | ❌ | Image de fond de la page thématique |
| `description` | richText (Lexical) | ❌ | Description rich text |
| `related_sections` | join ← `sections` | — | Sections liées (calculé automatiquement par Payload, lecture seule) |
| `related_documents` | join ← `documents` | — | Documents associés (calculé automatiquement, lecture seule) |

> Les champs `join` sont des **relations inverses** : Payload les calcule automatiquement. Par exemple, `related_documents` liste tous les documents qui ont cette thématique dans leur champ `thematics`. On ne les édite pas directement.

### Endpoints custom

**`GET /api/thematics/slug/:slug`** — Récupère une thématique par son slug.

**`POST /api/thematics/by-ids`** — Récupère plusieurs thématiques par leurs IDs avec l'enrichissement complet des documents associés.
```json
// Body :
{ "ids": [1, 2, 3] }
```

### Règles d'accès

- **Lecture :** publique

---

## `ReferenceLocations` — Lieux de référence

**Slug :** `reference-locations`
**Table PostgreSQL :** `reference_locations`
**Fichier :** `src/collections/ReferenceLocations.ts`

Les lieux géographiques liés à la mémoire ouvrière du Pays de Montbéliard (usines, quartiers, villes…).

### Champs

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `name` | text | ✅ | Nom du lieu (unique) |
| `slug` | text | ✅ | Identifiant URL unique, auto-généré par `checkSlug` |
| `background_image` | upload → `medias` | ❌ | Image de fond de la page lieu |
| `description` | richText (Lexical) | ✅ | Description du lieu |
| `quote` | richText (Lexical) | ❌ | Citation extraite de *Mémoires de l'Enclave* |
| `related_documents` | join ← `documents` | — | Documents liés à ce lieu (lecture seule, calculé automatiquement) |

### Endpoint custom : `GET /api/reference-locations/slug/:slug`

Récupère un lieu par son slug. Fait également une **requête manuelle** pour récupérer tous les documents dont `location.location_reference` correspond à ce lieu (le champ `join` natif de Payload n'étant pas toujours assez flexible pour les champs imbriqués).

### Règles d'accès

- **Lecture :** publique

---

## `Medias` — Médias (images)

**Slug :** `medias`
**Table PostgreSQL :** `medias`
**Fichier :** `src/collections/Medias.ts`

Collection d'upload pour les images utilisées comme illustrations dans les thématiques, lieux de référence et comme aperçus de documents audio/vidéo.

### Champs

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `filename` | text | — | Généré automatiquement à l'upload |
| `legende` | richText (Lexical) | ❌ | Légende rich text de l'image |

### Upload

- **Dossier de stockage :** `public/medias/`
- **URL de service :** `/medias/[filename]`
- **Types acceptés :** images uniquement (`image/*`)
- **Tailles générées :** `thumbnail` (140px) et `preview` (500px)

### Règles d'accès

- **Lecture :** publique

---

## `MetadataFiles` — Fichiers de métadonnées

**Slug :** `metadata-files`
**Fichier :** `src/collections/MetadataFiles.ts`

Collection pour uploader des fichiers de métadonnées liés aux documents d'archive (ex : fichiers XML de notices ISAD(G)).

---

## `DocumentTypes` — Types de documents

**Slug :** `document-types`
**Fichier :** `src/collections/DocumentTypes.ts`

Référentiel des types de documents (ex : "Photographie", "Enregistrement audio", "Film Super 8"…). Utilisé comme relation dans `Documents.physical_characteristics.document_types`.

---

## `MaterialTypesAndFormats` — Supports et formats

**Slug :** `material-types-and-formats`
**Fichier :** `src/collections/MaterialTypesAndFormats.ts`

Référentiel des supports et formats physiques (ex : "Négatif 35mm", "Cassette audio", "VHS"…).

---

## `Colors` — Couleurs

**Slug :** `colors`
**Fichier :** `src/collections/Colors.ts`

Référentiel de valeurs de couleur ou de tonalité des documents (ex : "Noir et blanc", "Couleur", "Sépia"…). Ne pas confondre avec le champ `color` de `Sections` qui est une couleur CSS d'affichage.

---

## `Users` — Utilisateurs

**Slug :** `users`
**Table PostgreSQL :** `users`
**Fichier :** `src/collections/Users.ts`

Utilisateurs autorisés à se connecter à l'interface d'administration. PayloadCMS gère automatiquement le hachage des mots de passe et les sessions JWT.

### Champs

| Champ | Type | Description |
|-------|------|-------------|
| `email` | email | Ajouté automatiquement par Payload (auth) |
| `password` | password | Haché automatiquement par Payload |
| `username` | text | Nom d'affichage (optionnel) |

### Premier utilisateur

Lors de la **première connexion** à `/admin`, Payload propose de créer le compte administrateur initial. Ce compte est stocké dans la table `users` de la base locale.

---

## Règles communes à toutes les collections

**Accès en lecture :** toutes les collections sont en lecture publique (`read: () => true`). Le site ne nécessite pas d'authentification pour consulter les données via l'API.

**Accès en écriture :** réservé aux utilisateurs authentifiés (implicite pour la plupart, explicite pour `Documents` : `create: ({ req }) => !!req.user`).

**Langues de l'admin :** les labels `singular` et `plural` sont définis en français et en anglais pour l'interface d'administration.
