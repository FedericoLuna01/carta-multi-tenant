import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    // TODO: Cambiar el origen
    origin: ["https://platomenu.com.ar", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const connectedClients = new Set();

io.on("connection", (socket) => {
  if (connectedClients.has(socket.id)) {
    console.log(`Cliente ya conectado: ${socket.id}`);
    return;
  }

  connectedClients.add(socket.id);
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  // Manejar la unión a una sala específica
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`Usuario ${userId} se unió a su sala`);
  });

  // Manejar nuevas órdenes
  socket.on("newOrder", (order) => {
    console.log("Nueva orden recibida:", order);

    // Emitir la orden solo a la sala del usuario correspondiente
    if (order.userId) {
      io.to(order.userId).emit("receiveOrder", order);
    } else {
      console.error("La orden no tiene userId:", order);
    }
  });

  socket.on("disconnect", () => {
    connectedClients.delete(socket.id);
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

httpServer.listen(3001, () => {
  console.log("Servidor Socket.IO está corriendo en http://localhost:3001");
});