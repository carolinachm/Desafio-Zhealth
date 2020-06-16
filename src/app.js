"use strict";

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb://cadastromedico:mongo123@ds051831.mlab.com:51831/cadastromedico', { useNewUrlParser: true , useUnifiedTopology: true  })


// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const medicoRoute = require('./routes/medico-route');


app.use("/", indexRoute);
app.use("/medico", medicoRoute);


module.exports = app;
