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
    type: Date,
    required: true
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
    type: String,
    required: true
  },
  confirmacaoSenha: {
    type: String
  },
  roles: [{
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
}] 
});

module.exports = mongoose.model('Medico', schema);