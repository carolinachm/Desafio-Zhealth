const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../bin/server');

const Medico = require('../src/models/medico');
const { request } = require('http');
const { expect } = require('chai');

const should = chai.should();

chai.use(chaihttp);

describe('Routes: Medico', ()=>{
    const defaultMedico = {

        cpf: "123456789",
        email: "teste@Teste123.com",
        nome: "teste",
        dataNascimento: "12/03/1586",
        crm: "12345678",
        estadoRegistroCRM: "goias",
        sexo: "m",
        senha : "12345678"

    };

    describe('get /medico', ()=>{
        it ('Lista de medicos', done => {
            request
            .get('/medico')
            .end((err, res) => {
                expect(res.body[0]).to.eql(defaultMedico)
                done(err)
            })
        })
    })
})