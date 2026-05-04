const express = require("express");
const cors = require("cors");

// Import des routes
const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");
const expenseRouter = require("./routes/expenseRoutes");

const app = express();

// Active CORS pour autoriser les requêtes externes
app.use(cors({
  origin: "*"
}));

// Permet de lire le JSON dans les requêtes
app.use(express.json());

// Définition des routes principales
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/expenses", expenseRouter);

// Route de test
app.get("/", (req, res) => {
  res.send("Domu API running");
});

// Export de l'application
module.exports = app;