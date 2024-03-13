const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);

    console.log(`Conectado correctamente`);
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la BBDD");
  }
};

module.exports = connection;
