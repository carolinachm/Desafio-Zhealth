"use strict";

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const config = require('./config')

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect(config.connectionString, { useNewUrlParser: true , useUnifiedTopology: true  })


// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const medicoRoute = require('./routes/medico-route');


app.use("/", indexRoute);
app.use("/medico", medicoRoute);


module.exports = app;
