const express = require("express");
const router = express.Router();

// Import des fonctions du contrôleur des dépenses
const { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } = require("../controllers/expenseController");

// Import du middleware d'authentification
const { authMiddleware } = require("../middlewares/authMiddleware");

// Créer une nouvelle dépense (protégé)
router.post("/", authMiddleware, createExpense);

// Récupérer toutes les dépenses (protégé)
router.get("/", authMiddleware, getExpenses);

// Récupérer une dépense par son ID (protégé)
router.get("/:id", authMiddleware, getExpenseById);

// Mettre à jour une dépense par son ID (protégé)
router.put("/:id", authMiddleware, updateExpense);

// Supprimer une dépense par son ID (protégé)
router.delete("/:id", authMiddleware, deleteExpense);

// Export du router pour l'utiliser dans l'application
module.exports = router;