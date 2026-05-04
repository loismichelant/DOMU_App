const jwt = require("jsonwebtoken");

// Middleware d'authentification
const authMiddleware = (req, res, next) => {

    // Récupère le header Authorization
    const authHeader = req.headers.authorization;

    // Vérifie si le token est présent et bien formaté
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authorization token is missing."
        });
    }

    // Extrait le token
    const token = authHeader.split(" ")[1];

    try {
        // Vérifie et décode le token avec la clé secrète
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Ajoute les infos de l'utilisateur à la requête
        req.user = {
            id: decode.id,
            email: decode.email
        };

        // Passe au middleware suivant
        next();
    } catch (error) {
        // Token invalide ou expiré
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};

// Export du middleware
module.exports = { authMiddleware };