"use strict";

const medicoRepository = require('../repositories/medico-repository')

exports.get = async (req, res, next) => {
    try{ 
        var data = await medicoRepository.get()
        res.status(200).send({
          mensagem: "Lista de medicos cadastrados",
          listaMedico: data,
        })
    }catch(e){
            res.status(500).send({
                message: "Falha ao processar sua requisição"
            })
        }
}

exports.getById = async (req, res, next) => {
    try{
         var data = await medicoRepository.getById(req.params.id)
        res.status(200).send({
          mensagem: "Lista de medicos cadastrados",
          listaMedico: data,
        })
    }catch(e){
        res.status(500).send({
        message: "Falha ao processar sua requisição"
    })
}
 }

exports.post = async (req, res, next) => {
    try{ 
        var data = await medicoRepository.create(req.body)
        res.status(201).send({
          mensagem: "Cadastrar um medico",
          medicoCriado: data,
        })
    }catch(e){
        res.status(500).send({
        message: "Falha ao processar sua requisição"
    })
}
}

exports.put = async (req, res, next) => {
    try{
        var data = await medicoRepository.update(req.params.id, req.body)
        res.status(201).send({
          mensagem: "Cadastro atualizado com sucesso",
          medicoCriado: data,
        })
    }catch(e){
        res.status(500).send({
        message: "Falha ao processar sua requisição"
    })
  }
}

  exports.delete = async(req, res, next) => {
    try {
        var data = await medicoRepository.delete(req.body.id)
        res.status(200).send({
            message: 'Medico removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};