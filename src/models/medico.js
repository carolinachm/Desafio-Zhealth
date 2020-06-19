"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  cpf: {
    type: String
  },
  email: {
    type: String
  },
  nome: {
    type: String
  },
  dataNascimento: {
    type: Date
  },
  crm: {
    type: Number
  },
  estadoRegistroCrm: {
    type: String,
  },
  sexo: {
    type: String
  },
  senha: {
    type: String
  },
  confirmacaoSenha: {
    type: String
  },
 
});

module.exports = mongoose.model('Medico', schema);