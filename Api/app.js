const express = require("express");
const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { auth } = require("express-openid-connect");
const { config } = require("./services/authServices");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");

const fileUpload = require('express-fileupload');
require('./services/googleAuthServices');
const paymentRoutes = require("./routes/paymentRoutes")



const app = express();
app.use(express.json()); //Middleware para que express pueda leer lo que viene por req.body. El método use se usa para usar middleware
app.use(cors());
app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' }));
app.use(cookieParser());
app.use(auth(config));

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
}));

//Routes



app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/products", productRouter); //middleware
app.use("/api/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/payment", paymentRoutes)
app.use("/", (req,res)=>{
  if(req.oidc){
    res.json(req.oidc.user)
  }else{
    res.send(" ")
  }
})

// app.use("/api/v1/users", userRouter); //middleware
app.use(express.static(`${__dirname}/public`));

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
