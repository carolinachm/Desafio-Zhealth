'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/medico-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');



exports.post = async (req, res, next) => {
    
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
           
        });

        res.status(201).send({
            message: 'Medico cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const medico = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
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
            name: medico.name,
            roles: medico.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: medico.email,
                name: medico.name
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
            name: medico.name,
            roles: medico.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: medico.email,
                name: medico.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};