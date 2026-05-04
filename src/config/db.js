const mongoose = require("mongoose");

// Fonction pour connecter l'application à MongoDB
const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    // Vérifie si l'URI est définie
    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined.");
    }

    try {
        // Connexion à la base de données
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        // Affiche l'erreur et arrête l'application
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Export de la fonction
module.exports = { connectDB };