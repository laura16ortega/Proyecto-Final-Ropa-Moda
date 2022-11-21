const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//Conexión con la base de datos
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }) //conexión a la base de datos, el primer argumento es el string de la base de datos, el segundo es un objeto con opciones
  .then(() => {
    console.log("DB connection successful!");
  });

//START THE SERVER
// console.log(process.env);
const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
}); //Así se inicializa el servidor, recibe como parámetros el puerto y un callback
