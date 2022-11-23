const express = require("express");

const productRouter = require("./routes/productRoutes");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");


const app = express();

app.use(express.json()); //Middleware para que express pueda leer lo que viene por req.body. El método use se usa para usar middleware
app.use(cors());

app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use("/api/v1/products", productRouter); //middleware
// app.use("/api/v1/users", userRouter); //middleware
app.use(express.static(`${__dirname}/public`));
module.exports = app;
