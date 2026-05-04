const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Génère un token JWT avec l'id et l'email de l'utilisateur
const generateToken = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // expiration du token
    );
};

// Formate les données utilisateur (exclut le mot de passe)
const serializeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

// Inscription d'un utilisateur
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Vérifie que tous les champs sont présents
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, Email and Password are required!"
            });
        }

        // Vérifie si l'email existe déjà
        const existingUser = await User.findOne({
            email: String(email).toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered!"
            });
        }

        // Hash le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crée l'utilisateur
        const user = await User.create({
            name,
            email: String(email).toLowerCase(),
            password: hashedPassword
        });

        // Retourne la réponse
        return res.status(201).json({
            message: "User created!",
            data: {
                user: serializeUser(user)
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while registering user!"
        });
    }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifie que les champs sont présents
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required!"
            });
        }

        // Recherche l'utilisateur
        const user = await User.findOne({
            email: String(email).toLowerCase()
        });

        // Si utilisateur non trouvé
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Vérifie le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Génère un token
        const token = generateToken(user._id, user.email);

        // Retourne la réponse
        return res.json({
            message: "Login successful",
            data: {
                token,
                user: serializeUser(user)
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while connecting user!"
        });
    }
};

// Récupère l'utilisateur connecté
const getMe = async (req, res) => {
    try {
        // Recherche l'utilisateur par son id (ajouté par le middleware)
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Retourne les données de l'utilisateur
        return res.json({
            message: "Authenticated user fetched successfully",
            data: {
                user: serializeUser(user)
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while getting user!"
        });
    }
};

// Récupère la liste des utilisateurs (sauf l'utilisateur connecté)
const listUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.user.id } // exclut l'utilisateur connecté
        })
        .select("-password") // exclut les mots de passe
        .sort({ name: 1 }); // trie par nom

        // Retourne la liste des utilisateurs
        return res.json({
            message: "Users fetched successfully",
            data: {
                users: users.map(serializeUser)
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while fetching users!"
        });
    }
};

// Récupère la liste de tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password") // exclut les mots de passe
      .sort({ name: 1 }); // trie par nom

    // Retourne la liste des utilisateurs
    return res.json({
      message: "All users fetched successfully",
      data: {
        users: users.map(serializeUser)
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while fetching all users!"
    });
  }
};

// Export des fonctions
module.exports = { register, login, getMe, listUsers, getAllUsers };