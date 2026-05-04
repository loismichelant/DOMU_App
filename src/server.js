require("dotenv").config(); // Charge les variables d'environnement

const { connectDB } = require("./config/db");
const app = require("./app");
const http = require("http");
const { initializeSocket } = require("./socket");

const PORT = process.env.PORT || 3000; // Port du serveur

// Fonction pour démarrer le serveur
const startServer = async () => {
    try {

        console.log("ENV TEST:", process.env.MONGODB_URI);
        
        // Connexion à la base de données
        await connectDB();

        // Création du serveur HTTP avec Express
        const server = http.createServer(app);

        // Initialisation des sockets
        initializeSocket(server);

        // Démarrage du serveur
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
        });

    } catch (error) {
        // Gestion des erreurs au démarrage
        console.error(error);
    }
};

// Lance le serveur
startServer();