# 🚀 Guide de Déploiement - Cabinet Hannit

Ce projet est composé d'un frontend (React/Vite) et d'un backend (Node.js/Express). Voici comment les déployer.

## 1. Déploiement avec Docker (Recommandé)

J'ai créé des fichiers Docker pour tout automatiser.

### Prérequis
- Installer [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Lancer tout le projet localement avec Docker
1. Ouvrez un terminal à la racine du projet.
2. Lancez la commande :
   ```bash
   docker-compose up --build
   ```
Votre site sera accessible sur `http://localhost:3000` et l'API sur `http://localhost:5000`.

---

## 2. Déploiement sur le Cloud

### Frontend (Vercel ou Netlify)
1. Connectez votre GitHub à [Vercel](https://vercel.com) ou [Netlify](https://www.netlify.com).
2. Choisissez le dossier racine.
3. Commande de build : `npm run build`
4. Dossier de sortie : `dist`

### Backend (Render, Railway, ou Heroku)
1. Créez un nouveau service Web.
2. Pointez vers le dossier `/backend`.
3. Ajoutez vos variables d'environnement (depuis le fichier `.env`) :
   - `EMAIL_USER`
   - `EMAIL_PASS` (votre App Password)
   - `EMAIL_RECEIVER`
4. Le fichier `Procfile` ou le `Dockerfile` dans `/backend` sera automatiquement détecté.

---

## 3. Fichiers créés
- `backend/Dockerfile` : Pour le serveur Express.
- `backend/Procfile` : Pour les plateformes comme Heroku/Render.
- `Dockerfile.frontend` : Pour le frontend React.
- `docker-compose.yml` : Pour lancer les deux services ensemble.
