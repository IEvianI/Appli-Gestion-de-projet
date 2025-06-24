# 🗂️ TaskFlow – Application de gestion de projet

**TaskFlow** est une application web de gestion de projet collaborative développée en **Laravel**, **React.js**, et **MySQL**. Elle permet de créer des projets, organiser des tâches, gérer des utilisateurs et suivre l’avancement.

---

## 🚀 Technologies utilisées

- **Back-end** : Laravel 10 (PHP)
- **Front-end** : React.js + Vite
- **Base de données** : MySQL (en prod) / SQLite (en local)
- **Déploiement** : Docker, CloudPanel, GitHub Actions (CI/CD)

---

## 🔧 Installation en local

### Prérequis

- PHP ≥ 8.2
- Composer
- Node.js ≥ 18
- Docker + Docker Compose

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/ton-pseudo/taskflow.git
cd taskflow

# 2. Démarrer les conteneurs Docker
docker compose up --build -d

# 3. Accéder à l’app en local
http://localhost:8080
