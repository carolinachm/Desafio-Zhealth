"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Connecta ao banco
mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Carrega os Models
const Medico = require('./models/medico')
const Prescricao = require('./models/prescricao');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const medicoRoute = require('./routes/medico-route');
const prescricaoRoute = require('./routes/prescricao-route');

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Habilita o CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/", indexRoute);
app.use("/medico", medicoRoute);
app.use("/prescricao", prescricaoRoute);

module.exports = app;
