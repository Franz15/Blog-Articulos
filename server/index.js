const connection = require("./database/connection");
const express = require("express");
const { Article } = require("./models/article");
const SocketServer = require("socket.io");
const cors = require("cors");

console.log("API funcionando");

connection();

const app = express();
const puerto = 5555;
const changeStream = Article.watch();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require("http").createServer(app);

const io = SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const ArticlesRoutes = require("./routes/articles");
app.use("/api", ArticlesRoutes);

io.on("connection", (socket) => {
  changeStream.on("change", (data) => {
    socket.broadcast.emit("change", data);
  });
});

server.listen(puerto, () => {
  console.log("Servidor NODE corriendo en el puerto", puerto);
});
