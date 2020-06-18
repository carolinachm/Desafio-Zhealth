'use strict';

const repository = require('../repositories/prescricao-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}
exports.getById = async(req, res, next) => {
    try {

        const id = await repository.getById(req.params.id);
    if(id === id){
        res.status(200).send({
            mensagem: "Busca a prescricao pelo id do medico cadastrado",
            id: id
        })
    }else {
        res.status(200).send({
            mensagem: "vc nao pode realizar consulta",
        })
    }
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
  
    try {
        

        await repository.create({
            medico: req.body.medico,
            cpfPaciente: req.body.cpfPaciente,
            nomePaciente: req.body.nomePaciente,
            dataNascimentoPaciente: req.body.dataNascimentoPaciente,
            descricaoMedicamento: req.body.descricaoMedicamento,
        }
        );
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};


