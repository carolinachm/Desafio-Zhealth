"use strict";
const prescricaoRepository = require('../repositories/prescricao-repository')
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try{ 
        var data = await prescricaoRepository.get()
        res.status(200).send({
          mensagem: "Lista de prescricaos cadastrados",
          listaprescricao: data
        })
    }catch(e){
            res.status(500).send({
                message: "Falha ao processar sua requisição"
            })
        }
}
// Metodo para o id do medico cadastrado poder ver a prescricao
exports.getById = async (req, res, next) => {
    
    try{
         var data = await prescricaoRepository.getById(req.params.id_medico)
        if(id != id_medico){
            res.status(400).send({
                message: "Falha ao processar sua requisição"

        }) }else{
            res.status(200).send({
                mensagem: "Lista de prescricaos cadastrada",
                listaprescricao: data,
              })
        }
        
    }catch(e){
        res.status(500).send({
        message: "Falha ao processar sua requisição"
    })
}
 }

exports.post = async (req, res, next) => {
    try{ 
        //recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica o token
        const data = await authService.decodeToken(token);

      await prescricaoRepository.create({
            medico: data.id,
            cpfPaciente: req.body.cpfPaciente,
            nomePaciente: req.body.nomePaciente,
            dataNascimentoPaciente: req.body.dataNascimentoPaciente,
            descricaoMedicamento: req.body.descricaoMedicamento
        })
        res.status(201).send({
          mensagem: "Cadastrar um prescricao"
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

