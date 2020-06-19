"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const config = require("./config");

const app = express();
const router = express.Router();

app.use(morgan('dev'))
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



app.use("/", indexRoute);
app.use("/medico", medicoRoute);
app.use("/prescricao", prescricaoRoute);

module.exports = app;
