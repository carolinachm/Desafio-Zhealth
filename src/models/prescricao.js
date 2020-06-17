"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medico'
    },
    cpfPaciente: {
        type: String
    },
    nomePaciente: {
        type: String
    },
    dataNascimentoPaciente: {
        type: String
    },
    descricaoMedicamento: {
        type: String
    }

});

mongoose.model('Prescricao', schema);