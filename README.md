# Portfolio d’Ehouman — édition galaxie

Site portfolio statique construit avec React, TypeScript et Vite. Le hero animé utilise GSAP/ScrollTrigger et Lenis. Les visuels cosmiques, le MP4 du hero, les captures locales et toutes les icônes sont inclus dans `public/` : aucune clé ou configuration Manus n’est nécessaire pour compiler le site.

## Prévisualiser sur son ordinateur

Prérequis : Node.js 22 et pnpm 11.25.0 (la version pnpm est indiquée dans `package.json`). À la racine du dépôt :

```bash
pnpm install --frozen-lockfile
pnpm run dev
```

La commande `pnpm run build` produit le site statique dans `dist/`. Pour vérifier cette version compilée avec `pnpm run preview`.

## Publier sur GitHub Pages

1. Créer un dépôt GitHub et y ajouter **le contenu de cette archive** (les fichiers doivent se trouver à la racine, pas dans un sous-dossier supplémentaire).
2. Ouvrir **Settings → Pages** et sélectionner **GitHub Actions** comme source de déploiement.
3. Pousser la branche `main` : le workflow `.github/workflows/deploy.yml` installe les dépendances, construit `dist/` et publie le résultat.
4. Consulter **Actions** pour suivre la première compilation et récupérer l’adresse Pages une fois le workflow terminé.

Les URLs d’assets sont relatives pour fonctionner aussi bien sous `https://<utilisateur>.github.io/<nom-du-depot>/` que sous un domaine personnalisé. Aucun secret GitHub ni serveur backend n’est requis. Les vignettes de SiraFlow et de l’association MIRACLE restent les URL externes déjà présentes dans `src/data/portfolio.ts`; les autres images de projet et tous les visuels galaxie sont dans cette archive.

## Personnaliser le portfolio

Les textes, liens, coordonnées et cartes de projet sont définis dans `src/data/portfolio.ts`. Les médias et icônes remplacés doivent être déposés dans `public/`, puis référencés depuis ce fichier avec des chemins relatifs (`./images/...`).
