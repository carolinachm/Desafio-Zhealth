"use strict";
const prescricaoRepository = require('../repositories/prescricao-repository')

exports.get = async (req, res, next) => {
    try{ 
        var data = await prescricaoRepository.get()
        res.status(200).send({
          mensagem: "Lista de prescricaos cadastrados",
          listaprescricao: data,
        })
    }catch(e){
            res.status(500).send({
                message: "Falha ao processar sua requisição"
            })
        }
}
// Metodo para o id do medico cadastrado poder ver a prescricao
exports.getById = async (req, res, next) => {
    const id = req.params.id_prescricao
    if(id === 'especial'){
        res.status(200).send({
            mensagem: "Busca a prescricao pelo id do medico cadastrado",
            id: id
        })
    }else {
        res.status(200).send({
            mensagem: "vc nao pode realizar consulta",
        })
    }
    try{
         var data = await prescricaoRepository.getById(req.params.id)
         
        res.status(200).send({
          mensagem: "Lista de prescricaos cadastrada",
          listaprescricao: data,
        })
    }catch(e){
        res.status(500).send({
        message: "Falha ao processar sua requisição"
    })
}
 }

exports.post = async (req, res, next) => {
    try{ 
        var data = await prescricaoRepository.create(req.body)
        res.status(201).send({
          mensagem: "Cadastrar um prescricao",
          prescricaoCriado: data,
        })
    }catch(e){
        res.status(500).send({
        message: "Falha ao processar sua requisição"
    })
}
}

exports.put = async (req, res, next) => {
    try{
        var data = await prescricaoRepository.update(req.params.id, req.body)
        res.status(201).send({
          mensagem: "Cadastro atualizado com sucesso",
          prescricaoCriado: data,
        })
    }catch(e){
        res.status(500).send({
        message: "Falha ao processar sua requisição"
    })
  }
}

