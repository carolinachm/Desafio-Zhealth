"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  CPF: { 
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
  CRM: { 
      type: String, 
      required: true 
    },
  estadoRegistroCRM: { 
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

  roles: [
    {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  ],
});

module.exports = mongoose.model('Medico', schema);
