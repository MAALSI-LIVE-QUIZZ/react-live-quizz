# React Live Quizz

Application de quiz en temps réel construite avec React, TypeScript et Vite.

## Stack Technique

- **React 19** avec TypeScript
- **Vite 7** pour le build et le développement
- **Tailwind CSS v4** pour le styling
- **shadcn/ui** pour les composants UI
- **React Router** pour la navigation

## Développement

### Prérequis

- Node.js 22+
- npm

### Installation

```bash
npm install
```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```bash
VITE_API_URL=http://localhost:3000
```

### Commandes de développement

```bash
# Démarrer le serveur de développement
npm run dev

# Lancer le linter
npm run lint

# Builder l'application
npm run build

# Prévisualiser le build de production
npm run preview
```

## Déploiement avec Docker

L'application peut être conteneurisée avec Docker pour un déploiement facile.

### Build de l'image Docker

#### Avec l'URL d'API par défaut

```bash
docker build -t react-live-quizz:latest .
```

#### Avec une URL d'API personnalisée

```bash
docker build --build-arg VITE_API_URL=https://api.example.com -t react-live-quizz:prod .
```

### Lancer le conteneur

```bash
# Exposer sur le port 8080
docker run -p 8080:80 react-live-quizz:prod
```

L'application sera accessible sur `http://localhost:8080`

### Options de build Docker

- `VITE_API_URL` : URL de l'API backend (défaut : `http://localhost:3000`)

**Note** : La variable d'environnement est embarquée dans le bundle au moment du build. Pour changer l'URL de l'API, vous devez reconstruire l'image Docker.

## Architecture

```
src/
├── components/
│   └── ui/          # Composants shadcn/ui
├── lib/
│   └── utils.ts     # Fonctions utilitaires
├── pages/           # Pages de l'application
├── App.tsx          # Composant principal avec routage
├── main.tsx         # Point d'entrée
└── index.css        # Styles globaux et Tailwind
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
