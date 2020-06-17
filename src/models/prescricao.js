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

<<<<<<< HEAD
module.exports = mongoose.model('Prescricao', schema);
=======
mongoose.model('Prescricao', schema);
>>>>>>> d5da4a74e9d1ea7c2342a7ad061d353cc86c8c5f
