const Task = require("../models/Task");
const { emitTaskCreated } = require("../socket");

// Créer une nouvelle tâche
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    // Vérifie les champs obligatoires
    if (!title || !assignedTo) {
      return res.status(400).json({
        message: "Title and assignedTo are required"
      });
    }

    // Crée la tâche
    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user.id
    });
    
    // Émet un événement
    emitTaskCreated(task);

    return res.status(201).json({
      message: "Task created",
      data: { task }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating task"
    });
  }
};

// Récupérer toutes les tâches
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email") // remplace l'id par les infos utilisateur
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 }); // tri du plus récent au plus ancien

    return res.json({
      message: "Tasks fetched",
      data: { tasks }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching tasks"
    });
  }
};

// Récupérer une tâche par son ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    // Vérifie si la tâche existe
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.json({
      message: "Task fetched",
      data: { task }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching task"
    });
  }
};

// Mettre à jour une tâche
const updateTask = async (req, res) => {
  try {
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true } // retourne la version mise à jour
    );

    // Vérifie si la tâche existe
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.json({
      message: "Task updated",
      data: { task }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating task"
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "done"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.json({
      message: "Task status updated",
      data: { task }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating status"
    });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    // Vérifie si la tâche existe
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.json({
      message: "Task deleted"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error deleting task"
    });
  }
};

// Export des fonctions
module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask, updateTaskStatus };