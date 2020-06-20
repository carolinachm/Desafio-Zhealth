"use strict";

const mongoose = require("mongoose");
const Medico = mongoose.model("Medico");


exports.get = async () => {
    const res = await Medico.find({}).populate('prescricao')
    return res
}
exports.getById = async (id) => {
    const res = await Medico.findById(id)
    return res
}
exports.create = async (data) => {
    var medico = new Medico(data);
    await medico.save()
}
exports.authenticate = async (data) => {
    const res = await Medico.findOne({
        email: data.email,
        senha: data.senha
    })
    return res
}
exports.update = async (id, data) => {
    await Medico.findByIdAndUpdate(id, {
        $set: {
          cpf: data.cpf,
          email: data.email,
          nome: data.nome,
          dataNascimento: data.dataNascimento,
          crm: data.crm,
          estadoRegistroCrm: data.estadoRegistroCrm,
          sexo: data.sexo,
          senha: data.senha,
          confirmacaoSenha: data.confirmacaoSenha
        },
      })
}
exports.delete = async (id) => {
    await Medico.findByIdAndDelete(id)
}

