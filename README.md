# DOMU App : Backend

https://domu-app.onrender.com

---

## Description

Backend de l’application **DOMU**, permettant la gestion de colocations:

* Authentification des utilisateurs
* Gestion des tâches
* Gestion des dépenses
* Calcul des dettes
* Mise à jour en temps réel avec Socket.io

---

## Technologies

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* Socket.io
* JWT (authentification)

---

## Installation locale

```bash
git clone https://github.com/loismichelant/DOMU_App.git
cd DOMU_App
npm install
npm start
```

Le serveur démarre sur:

```text
http://localhost:3000
```

---

## Variables d’environnement

Créer un fichier `.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

---

## Endpoints principaux

### Auth

* POST `/auth/register`
* POST `/auth/login`
* GET `/auth/me`
* GET `/auth/users`
* GET `/auth/all`

---

### Tasks

* GET `/tasks`
* POST `/tasks`
* PUT `/tasks/:id`
* DELETE `/tasks/:id`

---

### Expenses

* GET `/expenses`
* POST `/expenses`
* PUT `/expenses/:id`
* DELETE `/expenses/:id`

---

## Temps réel (Socket.io)

Événements:

* `taskCreated`
* `expenseCreated`

---

## Structure du projet

```text
src/
  controllers/
  routes/
  models/
  middleware/
  socket.js
  app.js
  server.js
```

---

## Fonctionnalités

* Authentification sécurisée avec JWT
* Relations utilisateurs, tâches et dépenses
* Calcul automatique des dettes
* API REST structurée
* WebSocket pour updates live

---

## Auteur

Projet réalisé dans le cadre d’un projet académique.
