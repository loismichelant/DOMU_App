const Expense = require("../models/Expense");
const { emitExpenseCreated } = require("../socket");

// Créer une nouvelle dépense
const createExpense = async (req, res) => {
  try {
    const { title, amount, paidBy, splitBetween } = req.body;
    
    // Vérifie les champs obligatoires
    if (!title || !amount || !paidBy) {
      return res.status(400).json({
        message: "Title, amount and paidBy are required"
      });
    }

    // Calcule le nombre de participants
    const participants = splitBetween && splitBetween.length > 0
      ? splitBetween.length
      : 1;

    // Calcule le montant par personne (arrondi à 2 décimales)
    const splitAmount = Math.round((amount / participants) * 100) / 100;

    // Crée la dépense
    const expense = await Expense.create({
      title,
      amount,
      paidBy,
      splitBetween,
      splitAmount,
      createdBy: req.user.id
    });

    // Émet un événement
    emitExpenseCreated(expense);

    // Retourne la réponse
    return res.status(201).json({
      message: "Expense created",
      data: { expense }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating expense"
    });
  }
};

// Récupérer toutes les dépenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("paidBy", "name email") // remplace l'id par les infos utilisateur
      .populate("splitBetween", "name email")
      .sort({ createdAt: -1 }); // tri du plus récent au plus ancien

    return res.json({
      message: "Expenses fetched",
      data: { expenses }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching expenses"
    });
  }
};

// Récupérer une dépense par son ID
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate("paidBy", "name email")
      .populate("splitBetween", "name email");

    // Vérifie si la dépense existe
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    return res.json({
      message: "Expense fetched",
      data: { expense }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching expense"
    });
  }
};

// Mettre à jour une dépense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // retourne la version mise à jour
    );

    // Vérifie si la dépense existe
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    return res.json({
      message: "Expense updated",
      data: { expense }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating expense"
    });
  }
};

// Supprimer une dépense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    // Vérifie si la dépense existe
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    return res.json({
      message: "Expense deleted"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error deleting expense"
    });
  }
};

// Export des fonctions
module.exports = { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense };