"use strict";

const mongoose = require("mongoose");
const Prescricao = mongoose.model("Prescricao");


exports.get = async (data) => {
    const res = await Prescricao
    .find({})
    .populate('medico')
    return res
}
exports.getById = async (id_medico) => {
    const res = await Prescricao.findById(id_medico)
    return res
}
exports.create = async (data) => {
    var prescricao = new Prescricao(data);
    await prescricao.save()
}
exports.update = async (id, data) => {
    await Prescricao.findByIdAndUpdate(id, {
        $set: {
            medico: data.medico,
            cpfPaciente: data.cpfPaciente,
            nomePaciente: data.nomePaciente,
            dataNascimentoPaciente: data.dataNascimentoPaciente,
            descricaoMedicamento: data.descricaoMedicamento
        },
      })
}


