# Guide de l'interface d'administration PayloadCMS

## Accès

| Environnement | URL |
|--------------|-----|
| Développement local | `http://localhost:3000/admin` |
| Production | `https://votre-domaine.fr/admin` |

---

## Première connexion

Lors de la **toute première** connexion à l'admin (base de données vide), PayloadCMS affiche un formulaire de création du compte administrateur initial :
- Renseignez un email et un mot de passe fort
- Ce compte est stocké dans la table `users` de PostgreSQL
- Il peut ensuite créer d'autres comptes depuis `Admin → Utilisateurs`

> Si la base a été restaurée depuis le dump (`backups/..._gou-db.sql`), les comptes admin existants sont déjà présents — utiliser les identifiants fournis séparément.

---

## Collections disponibles dans l'admin

L'interface liste toutes les collections dans la barre latérale gauche. Voici ce que chacune représente :

| Nom dans l'admin | Collection | Usage |
|-----------------|-----------|-------|
| **Documents** | `documents` | Gérer les documents d'archive (upload + métadonnées) |
| **Médias** | `medias` | Gérer les images utilisées comme illustrations |
| **Thématiques** | `thematics` | Créer/modifier les thématiques transversales |
| **Lieux de référence** | `reference-locations` | Gérer les lieux géographiques |
| **Rubriques** | `sections` | Gérer les rubriques de regroupement des thématiques |
| **Utilisateurs** | `users` | Gérer les comptes administrateurs |
| **Types de documents** | `document-types` | Référentiel des types (photographie, audio, etc.) |
| **Supports et formats** | `material-types-and-formats` | Référentiel des supports physiques |
| **Couleurs** | `colors` | Référentiel des tonalités (N&B, couleur, etc.) |
| **Fichiers de métadonnées** | `metadata-files` | Fichiers XML de notices d'archives |

---

## Ajouter un document d'archive

1. Aller dans **Documents → Créer un nouveau document**
2. Renseigner les champs :
   - **Cote** : identifiant unique d'archive (obligatoire, ex : `GOU_04_B_08_0010`)
   - **Intitulé** : titre descriptif du document
   - **Date** : date du document (format libre)
   - **Type** : `Image`, `Audio` ou `Vidéo`
   - **Texte alternatif** : description pour l'accessibilité (obligatoire)
   - **Crédit** : nom du détenteur des droits (obligatoire)
   - **Caractéristiques physiques** : type de document, support, couleur
   - **Thématiques associées** : associer à une ou plusieurs thématiques
   - **Lieu** : lieu de référence associé (optionnel)
3. Uploader le fichier média via le champ d'upload en haut
4. Sauvegarder

> Le **slug** est généré automatiquement depuis la cote au moment de la sauvegarde. Ne pas le modifier manuellement sauf raison impérieuse.

---

## Import de documents en masse

Le projet dispose d'un système d'**import CSV/Excel** accessible depuis la liste des Documents.

### Accès

`Admin → Documents → bouton "Importer des Documents"` (en haut à droite de la liste)

Ou directement : `/admin/import-documents`

### Préparer le fichier d'import

1. Cliquer sur **"Télécharger le modèle"** pour obtenir un fichier Excel pré-formaté avec toutes les colonnes attendues
2. Remplir le fichier ligne par ligne (une ligne = un document)
3. Colonnes obligatoires : `reference_code`, `title`, `date`, `type`, `alt`, `credits_name`

### Lancer l'import

1. Cliquer sur **"Importer des Documents"**
2. Choisir le fichier CSV ou Excel rempli
3. L'interface valide chaque ligne et affiche :
   - Le nombre de documents importés avec succès
   - Les lignes en erreur avec la raison

> ⚠️ L'import crée de nouveaux documents mais **ne met pas à jour** les documents existants. Pour modifier un document existant, utiliser l'interface d'édition.

---

## Export de documents

Depuis la liste des Documents, le bouton **"Exporter tous les documents"** génère un fichier Excel contenant tous les documents de la base avec leurs métadonnées. Utile pour faire des sauvegardes des métadonnées ou partager le catalogue.

---

## Ajouter un média (image d'illustration)

1. Aller dans **Médias → Créer un nouveau média**
2. Uploader l'image (formats acceptés : JPEG, PNG, WebP, SVG)
3. Ajouter une légende rich text si nécessaire
4. Sauvegarder

Le média est alors disponible pour être sélectionné dans les champs `background_image` des Thématiques et Lieux de référence.

---

## Créer une thématique

1. Aller dans **Thématiques → Créer une nouvelle thématique**
2. Renseigner :
   - **Titre** : nom de la thématique
   - **Image de fond** : sélectionner un média uploadé
   - **Description** : éditeur rich text (gras, italique, paragraphes)
   - **Ordre** : numéro pour contrôler l'ordre d'affichage
3. Le slug est généré automatiquement
4. Les **Documents associés** et **Sections liées** sont des champs en lecture seule calculés automatiquement — inutile de les renseigner

Pour qu'un document apparaisse dans une thématique, aller dans ce document et ajouter la thématique dans son champ **"Thématiques associées"**.

---

## Créer un lieu de référence

1. Aller dans **Lieux de référence → Créer un nouveau lieu**
2. Renseigner :
   - **Nom** : nom du lieu (unique)
   - **Image de fond** : sélectionner un média
   - **Description** : texte rich text (obligatoire)
   - **Citation** : extrait de *Mémoires de l'Enclave* (optionnel)
3. Pour qu'un document apparaisse dans ce lieu, aller dans le document et sélectionner ce lieu dans **"Lieu → Lieu de référence"**

---

## Gestion des utilisateurs

Seuls les utilisateurs inscrits peuvent se connecter et modifier le contenu.

**Ajouter un utilisateur :**
`Admin → Utilisateurs → Créer un nouvel utilisateur`
- Email (identifiant de connexion)
- Mot de passe (haché automatiquement, jamais stocké en clair)
- Nom d'utilisateur (optionnel)

**Réinitialiser un mot de passe :**
Depuis la page de connexion `/admin`, utiliser le lien "Mot de passe oublié".

---

## Interface GraphQL Playground

Une interface de test GraphQL est disponible à :
```
http://localhost:3000/api/graphql-playground
```

Utile pour explorer et tester les requêtes de données disponibles via l'API GraphQL de Payload.

---

## Personnalisation de l'admin

L'interface admin est personnalisée via les composants dans `src/components/cms/` :

- **Logo** : `AdminLogo.tsx` — affiché dans la barre latérale
- **Icône** : `AdminIcon.tsx` — favicon de l'espace admin
- **Dashboard** : `AdminDashboard.tsx` — page d'accueil de l'admin
- **Styles** : `src/app/(payload)/(payload)/custom.scss`

Pour modifier ces éléments, éditer les fichiers correspondants et redémarrer le serveur de développement.
