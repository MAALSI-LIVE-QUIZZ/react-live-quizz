# React Live Quizz

Application de quiz interactive avec collecte d'email, suivi des résultats et validation des réponses. Construite avec React, TypeScript et Vite.

## Fonctionnalités

- 📧 **Collecte d'email avec consentement** avant de démarrer un quiz
- ✅ **Validation des réponses en temps réel** avec feedback visuel
- 📊 **Calcul automatique du score** (note sur 20 et pourcentage)
- 🚀 **Envoi automatique des résultats** à une API dédiée
- 💾 **Tracking de session** (durée, horodatage, détails des réponses)
- 🎨 **Interface moderne** avec animations et design responsive

## Stack Technique

- **React 19** avec TypeScript
- **Vite 7** pour le build et le développement
- **Tailwind CSS v4** pour le styling
- **shadcn/ui** pour les composants UI (Input, Checkbox, Label, Button)
- **React Router** pour la navigation
- **Architecture API** séparée en services réutilisables

## Développement

### Prérequis

- Node.js 22+
- npm

### Installation

```bash
npm install
```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet (utilisez `.env.example` comme modèle) :

```bash
# API principale pour les quiz et questions
VITE_QUIZ_API_URL=http://localhost:3000

# API pour l'envoi des résultats
VITE_RESULTS_API_URL=http://localhost:3001
```

**Note importante** : L'application nécessite deux APIs distinctes :
- **QUIZ_API** : Fournit les quiz et questions (GET `/quizz`, GET `/quizz/:id`, GET `/questions`)
- **RESULTS_API** : Reçoit les résultats des utilisateurs (POST `/api/quiz-results`)

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

#### Avec les URLs d'API par défaut

```bash
docker build -t react-live-quizz:latest .
```

#### Avec des URLs d'API personnalisées

```bash
docker build \
  --build-arg VITE_QUIZ_API_URL=https://quiz-api.example.com \
  --build-arg VITE_RESULTS_API_URL=https://results-api.example.com \
  -t react-live-quizz:prod .
```

### Lancer le conteneur

```bash
# Exposer sur le port 8080
docker run -p 8080:80 react-live-quizz:prod
```

L'application sera accessible sur `http://localhost:8080`

### Options de build Docker

- `VITE_QUIZ_API_URL` : URL de l'API des quiz (défaut : `http://localhost:3000`)
- `VITE_RESULTS_API_URL` : URL de l'API des résultats (défaut : `http://localhost:3001`)

**Note** : Les variables d'environnement sont embarquées dans le bundle au moment du build. Pour changer les URLs des APIs, vous devez reconstruire l'image Docker.

## Architecture

```
src/
├── components/
│   ├── ui/              # Composants shadcn/ui (Button, Input, Checkbox, Label)
│   ├── QuizCard.tsx     # Carte de quiz pour la liste
│   └── QuizList.tsx     # Liste des quiz disponibles
├── lib/
│   └── utils.ts         # Fonctions utilitaires (cn)
├── pages/
│   └── QuizPage.tsx     # Page principale du quiz avec 3 écrans
├── services/
│   ├── quizApi.ts       # Service API pour les quiz
│   └── resultsApi.ts    # Service API pour l'envoi des résultats
├── types/
│   ├── quiz.ts          # Types pour les quiz
│   ├── question.ts      # Types pour les questions et réponses
│   └── result.ts        # Types pour les résultats et sessions
├── App.tsx              # Composant principal avec routage
├── main.tsx             # Point d'entrée
└── index.css            # Styles globaux et Tailwind
```

## Flux de l'application

1. **Page d'accueil** : Liste de tous les quiz disponibles
2. **Écran de collecte d'email** : L'utilisateur doit renseigner son email et accepter l'envoi des résultats
3. **Déroulement du quiz** : Questions une par une avec validation instantanée
4. **Écran de résultats** : Affichage du score + envoi automatique des résultats à l'API

## Format des données envoyées à l'API des résultats

```typescript
POST /api/quiz-results
Content-Type: application/json

{
  "email": "user@example.com",
  "quizId": 1,
  "quizTitle": "Quiz React",
  "score": {
    "correct": 8,
    "total": 10,
    "percentage": 80,
    "grade": "16.0"
  },
  "answers": [
    {
      "questionId": 1,
      "questionTitle": "Qu'est-ce que React?",
      "answerId": 5,
      "answerText": "Une bibliothèque JavaScript",
      "isCorrect": true
    }
    // ... autres réponses
  ],
  "completedAt": "2025-11-05T14:30:00.000Z",
  "sessionDuration": 180  // en secondes
}
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
