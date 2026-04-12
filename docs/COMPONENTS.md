# Composants React

Ce document décrit tous les composants React du projet, leur rôle et leur fonctionnement.

---

## Principe : Server Components vs Client Components

Next.js 15 App Router distingue deux types de composants :

**Server Components (défaut)** : rendus côté serveur, pas de JavaScript envoyé au navigateur, peuvent accéder directement à la base de données. Idéal pour l'affichage de données statiques.

**Client Components (`'use client'`)** : s'exécutent dans le navigateur, peuvent utiliser `useState`, `useEffect`, les événements DOM. Nécessaires pour l'interactivité.

> Règle d'or : commencer par un Server Component. N'ajouter `'use client'` que si nécessaire.

---

## Composants serveur

### `Header.tsx` *(client en réalité)*

> **Attention :** bien que visuellement "serveur", le Header est marqué `'use client'` pour gérer l'ouverture/fermeture du menu burger mobile.

Navigation principale du site. Contient :
- Le logo / titre du webdocumentaire
- Les liens de navigation principaux
- Un menu hamburger sur mobile (avec état ouvert/fermé géré par `useState`)

---

### `Footer.tsx`

Pied de page du site public. Contient les logos des partenaires (UMLP, ELLIADD, MSHE, RBFC) et les liens vers les pages annexes (mentions légales, équipe, partenaires).

---

### `Sections.tsx`

Reçoit une liste de sections (rubriques) et les affiche. Utilisé dans les pages chapitres pour structurer le contenu en blocs thématiques.

---

### `Details.tsx`

Affiche le bloc de métadonnées d'un document d'archive : cote, date, type, support, crédits, lien vers la notice externe, lieu associé. Utilisé dans les pages `/documents/[slug]`.

---

### `DocumentNav.tsx`

Barre de navigation interne à une page document. Affiche les thématiques associées au document sous forme de tags cliquables, permettant de naviguer vers la page de chaque thématique.

---

### `Return.tsx`

Bouton générique "Retour" qui redirige vers la page précédente dans l'historique du navigateur.

---

### `GalleryItem.tsx`

Composant d'affichage d'un seul élément de galerie : image + légende. Utilisé comme brique de base par `Gallery.tsx`.

---

### `SuggestionsCard.tsx`

Carte de suggestion affichée en bas de page (section "Voir aussi"). Affiche une image de vignette, un titre et un lien vers un document ou un lieu de référence.

---

## Composants client

### `CarteMap.tsx`

Carte interactive affichant les lieux de référence du Pays de Montbéliard.

**Fonctionnement :**
- Affiche une image de carte en fond
- Positionne des **pins cliquables** sur la carte pour chaque lieu de référence
- Au clic sur un pin → navigation vers `/lieux-reference/[slug]`
- Au survol → zoom sur la zone et affichage du nom du lieu

---

### `DocumentairePlayer.tsx`

Lecteur vidéo du documentaire avec système de **chapitrage**.

**Fonctionnement :**
- Affiche un lecteur `<video>` HTML5
- Affiche une liste de chapitres horodatés sur le côté
- Au clic sur un chapitre → `video.currentTime = timestamp` (seek direct)
- Gère l'état courant pour mettre en évidence le chapitre en cours de lecture

---

### `LieuReferencePage.tsx`

Page d'un lieu de référence avec **toggle** entre deux modes d'affichage.

**Fonctionnement :**
- Affiche par défaut la **description** du lieu
- Bouton pour basculer vers la **citation** extraite de *Mémoires de l'Enclave*
- La transition entre les deux est animée en CSS (slide)
- L'état du toggle est géré par `useState`

---

### `Carousel.tsx`

Carrousel d'images avec navigation manuelle.

**Fonctionnement :**
- Affiche une image à la fois
- Boutons Précédent / Suivant pour naviguer
- Indicateur de position (ex : "3 / 7")
- L'index courant est géré par `useState`

---

### `Gallery.tsx`

Grille de photos avec **lightbox** au clic.

**Fonctionnement :**
- Affiche toutes les images en grille (layout CSS)
- Au clic sur une image → ouverture en plein écran (lightbox)
- La lightbox affiche l'image en grand + la légende
- Navigation dans la lightbox (précédent/suivant)
- Fermeture avec Échap ou clic en dehors

---

### `Audio.tsx`

Lecteur audio HTML5 personnalisé (le lecteur natif du navigateur est remplacé pour homogénéiser le style).

**Fonctionnement :**
- Bouton Play/Pause avec icônes personnalisées
- Barre de progression cliquable (seek)
- Bouton Mute/Unmute
- Affichage du temps courant / durée totale

---

### `Video.tsx`

Lecteur vidéo HTML5 pour les documents de type vidéo (distinct du `DocumentairePlayer` qui est dédié au film documentaire principal).

---

### `ImageFullscreen.tsx`

Image avec mode **plein écran** au clic.

**Fonctionnement :**
- Affiche l'image normalement
- Au clic → ouverture en overlay plein écran
- L'état plein écran est géré par `useState`
- Fermeture avec Échap ou clic en dehors

---

### `ImageTooltip.tsx`

Image avec **légende apparaissant au survol**.

**Fonctionnement :**
- Affiche une image
- Au survol → apparition d'un bandeau semi-transparent en bas avec la légende
- Utilisé notamment sur la page d'accueil pour l'image principale

---

## Composants de l'interface admin (`cms/`)

Ces composants personnalisent l'interface d'administration de PayloadCMS. Ils sont enregistrés dans `payload.config.ts`.

---

### `AdminLogo.tsx`

Logo affiché dans la barre latérale de l'admin (remplace le logo Payload par défaut par le logo du projet).

### `AdminIcon.tsx`

Icône (favicon) affichée dans les onglets du navigateur quand on est dans l'espace admin.

### `AdminDashboard.tsx`

Tableau de bord affiché sur la page d'accueil de l'interface admin (`/admin`). Peut contenir des raccourcis, des statistiques ou des informations utiles pour les éditeurs de contenu.

---

### `DocumentsActions.tsx`

Barre d'actions personnalisée affichée **au-dessus de la liste des documents** dans l'admin (via `beforeListTable`). Contient les boutons d'import et d'export.

### `ExportAllDocumentsButton.tsx`

Bouton qui déclenche l'export de **toute la collection Documents** en fichier CSV/Excel. Utilise ExcelJS pour générer le fichier côté client.

### `ExportTemplateButton.tsx`

Bouton qui télécharge un **fichier modèle CSV/Excel** vierge, pré-rempli avec les colonnes attendues pour l'import de documents. Permet aux éditeurs de préparer un fichier d'import correctement formaté.

### `ImportButton.tsx`

Bouton simple qui redirige vers la vue d'import custom (`/admin/import-documents`).

---

### `importDocumentsFrom/ImportDocumentsFormView.tsx`

**Vue custom enregistrée dans PayloadCMS** à l'adresse `/admin/import-documents`. C'est une page entière dans l'admin (pas juste un composant). Elle affiche le formulaire d'import.

### `importDocumentsFrom/ImportDocumentsForm.tsx`

Formulaire React d'import de documents en masse depuis un fichier CSV ou Excel.

**Fonctionnement :**
1. L'utilisateur choisit un fichier CSV/XLSX
2. Le formulaire lit le fichier avec ExcelJS
3. Il valide chaque ligne (colonnes requises, types corrects)
4. Il envoie les données valides à l'API Payload (`POST /api/documents`)
5. Affiche un rapport : nombre de documents importés, lignes en erreur

### `importDocumentsFrom/ImportDocumentsForm.css`

Styles spécifiques au formulaire d'import (indépendants de Tailwind pour éviter les conflits avec les styles de l'admin Payload).
