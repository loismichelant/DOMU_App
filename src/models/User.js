const mongoose = require("mongoose");

// Définition du schéma pour les utilisateurs
const userSchema = new mongoose.Schema(
    {
        // Nom de l'utilisateur
        name: {
            type: String,
            required: true, // champ obligatoire
            trim: true // supprime les espaces inutiles
        },

        // Email de l'utilisateur
        email: {
            type: String,
            required: true, // champ obligatoire
            unique: true, // doit être unique en base de données
            lowercase: true, // convertit en minuscules
            trim: true, // supprime les espaces inutiles
            match: [/.+\@.+\..+/, "Please enter a valid email"] // validation simple du format
        },

        // Mot de passe de l'utilisateur
        password: {
            type: String,
            required: true // champ obligatoire
        }
    },
    {
        timestamps: true // ajoute createdAt et updatedAt automatiquement
    }
);

// Création du modèle User basé sur le schéma
const User = mongoose.model("User", userSchema);

// Export du modèle pour pouvoir l'utiliser ailleurs
module.exports = User;