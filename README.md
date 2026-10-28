# Le Matana · site vitrine

Site d'une page pour **Le Matana**, restaurant italien et pizzeria cachère, 103 rue Gabriel Péri, 92120 Montrouge.
HTML, CSS et JavaScript sans framework ni étape de build : il suffit d'ouvrir les fichiers et de les modifier.

## Arborescence

```
index.html              Page principale (accueil, carte, restaurant, réservation, infos)
mentions-legales.html   Mentions légales (à compléter)
data/site.js            Téléphone, e-mail, horaires, liens livraison et réseaux, certification cachère
data/menu.js            La carte complète (catégories, plats, descriptions, prix)
css/style.css           Styles (couleurs et polices en haut du fichier, dans :root)
js/main.js              Carrousel, menu burger, onglets de la carte, formulaire, animations
images/                 Toutes les photos + logo (voir images/CREDITS.md)
favicon.svg             Icône d'onglet (monogramme M)
robots.txt, sitemap.xml, vercel.json
```

## Modifier la carte

Ouvrez `data/menu.js`. Chaque catégorie contient une liste de plats :

```js
{ name: "Margherita", desc: "Tomate, mozzarella, basilic", price: 15 },
```

- **Prix** : un nombre (`16.5` pour 16,50 €). Mettez `null` pour masquer le prix.
- **Description** : texte libre, ou `""` pour ne rien afficher.
- **Badge** : ajoutez `tag: "Signature"` ou `tag: "Végétarien"` (le badge végétarien est vert).
- **Note de catégorie** : `note: "Supplément gratiné 2 €."` s'affiche sous le titre de la catégorie.
- **Ajouter un plat** : copiez une ligne et modifiez-la. **Ajouter une catégorie** : copiez un bloc `{ id, title, items }` (l'onglet est créé automatiquement).

## Modifier les infos (horaires, téléphone, liens)

Tout est dans `data/site.js` :

- `hours` : une ligne par jour. `closed: true` pour un jour de fermeture, `note` pour une précision.
- `phone` (affiché) et `phoneIntl` (utilisé pour le lien d'appel).
- `delivery.deliveroo` / `delivery.ubereats` : liens des pages de livraison.
- `social.instagram` / `social.facebook`.
- `kosherCertification` : nom de l'organisme de certification.
- `google` : note et nombre d'avis (à actualiser de temps en temps).

> Les horaires figurent aussi dans les données structurées pour Google, dans `index.html`
> (rechercher `openingHoursSpecification`). Pensez à les aligner après chaque changement.

Les textes éditoriaux (accroches du carrousel, présentation, plats signatures, ambiance, privatisation) se modifient directement dans `index.html` ; chaque section est signalée par un commentaire.

## Formulaire de réservation

Par défaut, le formulaire ouvre la messagerie du client avec un e-mail pré-rempli adressé à `email` (data/site.js).
Pour un envoi direct sans messagerie : créez un formulaire gratuit sur [formspree.io](https://formspree.io), puis collez son identifiant dans `formspreeId` (ex. `"xyzabcd"`).

## Remplacer les photos

Les photos actuelles sont des photos d'illustration Unsplash (liste dans `images/CREDITS.md`).
Pour mettre les vraies photos du restaurant, **gardez le même nom de fichier** et remplacez l'image dans `images/`.
Conseils : JPG, 1600 à 2200 px de large pour le hero, 1000 à 1400 px pour les autres, 300 Ko maximum.
Le hero utilise deux versions de chaque image : paysage (`hero-*.jpg`) et portrait pour mobile (`hero-*-mobile.jpg`, environ 1000 × 1700 px).

Le logo (`images/logo-le-matana.svg`) est recréé d'après l'enseigne ; le site utilise la même construction en SVG dans `index.html` (symbole `i-logo`).

## Tester en local

```bash
python -m http.server 8000
```

puis ouvrez http://localhost:8000.

## Déployer sur Vercel

Le projet est relié à GitHub : **chaque `git push` sur `main` redéploie automatiquement** le site.

Première mise en ligne (déjà faite pour ce projet) :

1. Créer un dépôt GitHub et y pousser le dossier.
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt. Framework : *Other*, aucune commande de build, dossier de sortie : racine.
3. Pour un nom de domaine (ex. `lematana.fr`) : Vercel › Project › Settings › Domains, puis remplacer `https://le-matana.vercel.app` dans `index.html`, `robots.txt` et `sitemap.xml`.
