"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    medico:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medico'
    },
    cpfPaciente : {
        type:String
    },
    nomePaciente : {
        type:String
    }, 
    dataNascimentoPaciente : {
        type:String
    },
    descricaoMedicamento : {
        type:String
    }
    
});

module.exports = mongoose.model('Prescricao', schema);
