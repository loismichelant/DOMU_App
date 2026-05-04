const express = require("express");
const router = express.Router();

// Import des fonctions du contrôleur d'authentification
const { register, login, getMe, listUsers, getAllUsers } = require("../controllers/authController");

// Import du middleware d'authentification
const { authMiddleware } = require("../middlewares/authMiddleware");

// Route pour s'inscrire
router.post("/register", register);

// Route pour se connecter
router.post("/login", login);

// Route pour récupérer les infos de l'utilisateur connecté
// protégée par le middleware d'authentification
router.get("/me", authMiddleware, getMe);

// Route pour récupérer la liste des utilisateurs
// protégée par le middleware d'authentification
router.get("/users", authMiddleware, listUsers);

// Route pour récupérer la liste de tous les utilisateurs
// protégée par le middleware d'authentification
router.get("/all", authMiddleware, getAllUsers);

// Export du router pour l'utiliser dans l'application
module.exports = router;