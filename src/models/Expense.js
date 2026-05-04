const mongoose = require("mongoose");

// Définition du schéma pour les dépenses
const expenseSchema = new mongoose.Schema(
  {
    // Titre de la dépense
    title: {
      type: String,
      required: true, // champ obligatoire
      trim: true // supprime les espaces inutiles
    },

    // Montant de la dépense
    amount: {
      type: Number,
      required: true, // champ obligatoire
      min: 0 // valeur minimum autorisée
    },

    // Utilisateur qui a payé
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // référence au modèle User
      required: true // champ obligatoire
    },

    // Liste des utilisateurs concernés par le partage
    splitBetween: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // référence au modèle User
      }
    ],

    // Montant à partager par personne
    splitAmount: {
      type: Number,
      min: 0 // valeur minimum autorisée
    },

    // Date de la dépense
    date: {
      type: Date,
      default: Date.now // valeur par défaut : date actuelle
    }
  },
  {
    timestamps: true // ajoute createdAt et updatedAt automatiquement
  }
);

// Export du modèle Expense basé sur le schéma
module.exports = mongoose.model("Expense", expenseSchema);