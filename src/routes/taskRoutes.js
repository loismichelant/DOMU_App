const express = require("express");
const router = express.Router();

// Import des fonctions du contrôleur des tâches
const { createTask, getTasks, getTaskById, updateTask, deleteTask, updateTaskStatus } = require("../controllers/taskController");

// Import du middleware d'authentification
const { authMiddleware } = require("../middlewares/authMiddleware");

// Créer une nouvelle tâche (protégé)
router.post("/", authMiddleware, createTask);

// Récupérer toutes les tâches (protégé)
router.get("/", authMiddleware, getTasks);

// Récupérer une tâche par son ID (protégé)
router.get("/:id", authMiddleware, getTaskById);

// Mettre à jour une tâche par son ID (protégé)
router.put("/:id", authMiddleware, updateTask);

router.patch("/:id/status", authMiddleware, updateTaskStatus);

// Supprimer une tâche par son ID (protégé)
router.delete("/:id", authMiddleware, deleteTask);

// Export du router pour l'utiliser dans l'application
module.exports = router;