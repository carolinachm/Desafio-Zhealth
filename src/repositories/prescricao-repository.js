"use strict";

const mongoose = require("mongoose");
const Prescricao = mongoose.model("Prescricao");


exports.get = async () => {
    const res = await Prescricao.find({})
    return res
}
exports.getById = async (id) => {
    const res = await Prescricao.findById(id)
    return res
}
exports.create = async (data) => {
    var prescricao = new Medico(data);
    await prescricao.save()
}
exports.update = async (id, data) => {
    await Prescricao.updateOne(id, {
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


