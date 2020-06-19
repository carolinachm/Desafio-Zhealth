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
        type: Date,
        required: false
    },
    descricaoMedicamento: {
        type: String
    }

});

module.exports = mongoose.model('Prescricao', schema);