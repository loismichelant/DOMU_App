const mongoose = require("mongoose");

// Définition du schéma pour les tâches
const taskSchema = new mongoose.Schema(
  {
    // Titre de la tâche
    title: {
      type: String,
      required: true, // champ obligatoire
      trim: true // supprime les espaces inutiles
    },

    // Description de la tâche
    description: {
      type: String,
      trim: true // supprime les espaces inutiles
    },

    // Statut de la tâche
    status: {
      type: String,
      enum: ["pending", "done"], // valeurs autorisées
      default: "pending" // valeur par défaut
    },

    // Utilisateur à qui la tâche est assignée
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // référence au modèle User
      required: true // champ obligatoire
    },

    // Utilisateur qui a créé la tâche
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // référence au modèle User
      required: true // champ obligatoire
    }
  },
  {
    timestamps: true // ajoute createdAt et updatedAt automatiquement
  }
);

// Export du modèle Task basé sur le schéma
module.exports = mongoose.model("Task", taskSchema);