const express = require("express");

const productRouter = require("./routes/productRoutes");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const {auth} = require("express-openid-connect");
const { config } = require("./services/authServices");
const cookieParser = require("cookie-parser");
require('./services/googleAuthServices');


const app = express();



app.use(express.json()); //Middleware para que express pueda leer lo que viene por req.body. El método use se usa para usar middleware
app.use(cors());
app.use(cookieParser());
app.use(auth(config));
 
//Routes


app.use("/api/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


//ROUTES
app.use("/api/v1/products", productRouter); //middleware
// app.use("/api/v1/users", userRouter); //middleware
app.use(express.static(`${__dirname}/public`));
module.exports = app;

