"use strict";

const medicoRepository = require('../repositories/medico-repository')
const md5 = require('md5')


const authSevice = require('../services/auth-service')

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
        var data = await medicoRepository.create({
            cpf: req.body.cpf,
            email: req.body.email,
            nome: req.body. nome,
            dataNascimento: req.body. dataNascimento,
            crm: req.body.crm,
            estadoRegistroCrm: req.body.estadoRegistroCrm,
            sexo: req.body.sexo,
            senha:md5(req.body.senha + global.SALT_KEY),
            confirmacaoSenha: req.body.confirmacaoSenha,
            roles:["user"]
        })
        res.status(201).send({
          mensagem: "Medico cadastrado com sucesso!",
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
exports.authenticate = async (req, res, next) => {
    try{ 
        const medico = await medicoRepository.authenticate({
            
            email: req.body.email,
            senha:md5(req.body.senha + global.SALT_KEY),
            
        })
        if(!medico){
            res.status(404).send({
                mensagem: 'Usuario ou senha invalidos'
            })
            return
        }
        const token = await authSevice.generateToken({
            id:medico._id,
            email:medico.email,
            nome: medico.nome,
            roles: medico.roles
        })
        res.status(201).send({
            token: token,
            data:{
                email:medico.email,
                nome: medico.nome
            }
        })
    }catch(e){
        res.status(500).send({
        message: "Falha ao processar sua requisição"
    })
}
}
exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const medico = await medicoRepository.getById(data.id);

        if (!medico) {
            res.status(404).send({
                message: 'Medico não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: medico._id,
            email: medico.email,
            nome: medico.nome,
            roles: medico.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: medico.email,
                nome: medico.nome
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}