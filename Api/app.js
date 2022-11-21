const express = require("express");

const app = express();

app.use(express.json()); //Middleware para que express pueda leer lo que viene por req.body. El método use se usa para usar middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(express.static(`${__dirname}/public`));

module.exports = app;
