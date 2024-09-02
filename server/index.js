const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

console.log("API funcionando");

connection();

const app = express();
const puerto = 5555;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require("http").createServer(app);

const ArticlesRoutes = require("./routes/articles");
app.use("/api", ArticlesRoutes);

server.listen(puerto, () => {
  console.log("Servidor NODE corriendo en el puerto", puerto);
});
