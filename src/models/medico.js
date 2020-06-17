"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  dataNascimento: {
    type: String,
    required: true
  },
  crm: {
    type: String,
    required: true
  },
  estadoRegistroCrm: {
    type: String,
    required: true
  },
  sexo: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  confirmacaoSenha: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  }],
});

mongoose.model('Medico', schema);