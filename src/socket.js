const { Server } = require("socket.io");

let io; // instance globale de Socket.io

// Initialise Socket.io avec le serveur HTTP
const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*" // autorise toutes les origines
        }
    });

    // Lorsqu'un client se connecte
    io.on("connection", (socket) => {
        console.log("Client connected");

        // Message envoyé au client dès la connexion
        socket.emit("socket:ready", {
            message: "WebSocket connection established"
        });

        // Lorsqu'un client se déconnecte
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    return io;
};

// Émet un événement quand une tâche est créée
const emitTaskCreated = (task) => {
    if (!io) return;

    io.emit("task:created", {
        message: "New task created",
        data: { task }
    });
};

// Émet un événement quand une dépense est créée
const emitExpenseCreated = (expense) => {
    if (!io) return;

    io.emit("expense:created", {
        message: "New expense added",
        data: { expense }
    });
};

// Export des fonctions socket
module.exports = { initializeSocket, emitTaskCreated, emitExpenseCreated };