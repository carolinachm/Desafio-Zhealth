'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/medico-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}


exports.post = async (req, res, next) => {

    // Se os dados forem inválidos
    if (!ValidationContract.prototype.isValid()) {
        res.status(400).send(ValidationContract.prototype.errors()).end();
        return;
    }

    // TODO: validar se e-mail já existe para não permitir cadastrar médicos iguais
    // TODO: marcar o campo email no schema como unique:true
    // TODO: validar se o campo de confirmação de senha é o mesmo do campo senha
    // TODO: validar se todos os campos obrigatórios (required) foram informados
    // TODO: não deve salvar a confirmação de senha

    try {
        req.body.senha = md5(req.body.senha + global.SALT_KEY);

        const medico = await repository.create(req.body);

        res.status(200).json({
            message: 'Medico cadastrado com sucesso!',
            medico
        });
    } catch (e) {
        res.status(500).json({
            message: 'Falha ao processar sua requisição',
            error: e
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.authenticate = async (req, res, next) => {

    // TODO: encapsular apenas o ID do médico autenticado
    // TODO: o retorno do repository.authenticate pode vir já apenas com o ID
    //      não precisa vir com todas as informações do médico
    //      só vai usar o ID para encapsular no token
    //      Evita tráfego de dados que não serão usados, risco interceptação e exposição
    //      ex.: medico.findOne({email:"", senha:""},{"id":1})

    try {
        const medico = await repository.authenticate({
            ...req.body,
            senha: md5(req.body.senha + global.SALT_KEY)
        });

        if (!medico) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
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
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const medico = await repository.getById(data.id);

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
};
exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Medico atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};