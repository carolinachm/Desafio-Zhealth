process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Medico = require('../src/models/medico');

//Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/server');
var should = chai.should();

chai.use(chaiHttp);

//Aqui é o bloco principal que executará o nossos testes:
describe('Medico', () => {
    beforeEach((done) => {

        //Sempre depois de executar o nosso teste, iremos limpar a nossa base de dados:
        Medico.deleteOne({},(error)=> {
            done();
        });
    });

/** 
 * Teste da rota: /GET
 */
describe('/GET medico',() => {
    it('Deve retornar todos os medico',(done)=> {
        chai.request(server)
        .get('/medico')
        .end((error, res)=> {
            //Se tudo der certo deve retornar o status: 200 - OK
            res.should.have.status(200);
            //E em seguida retornar em um array todos os medicos cadastrados na base de dados:
            res.body.should.be.a('array');
            //res.body.length.should.be.eql(0);
        done();
        });
    });
});

/** 
 * Teste da rota: /POST
 */
describe('/POST medico',() => {
    it('Não deve retornar o POST do medico criado, uma vez que não foi definido o campo: paginas',(done) => {
       
        //Aqui simulamos a criação de um medico, porém sem definir o medico:
        var medico = {
            cpf: "000011111111",
            email: "teste@TEste",
            nome: "jao",
            dataNascimento: "1983-03-18",
            crm: "123456",
            estadoRegistroCRM: "Distro Federal",
            senha: "123456",
            confirmacaoSenha: "123456"
        }
        chai.request(server)
        .post('/medico')
        .send(medico)
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('sexo');
            res.body.errors.sexo.should.have.property('kind').eql('required');
            done();
        });
    });
    
    it('Deve Criar um medico',(done) => {
        var medico = {
            cpf: "000011111111",
            email: "teste@TEste",
            nome: "jao",
            dataNascimento: "1983-03-18",
            crm: "123456",
            estadoRegistroCRM: "Distro Federal",
            sexo: "F",
            senha: "123456",
            confirmacaoSenha: "123456"
        } 
        chai.request(server)
        .post('/medico')
        .send(medico)
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('medico adicionado com Sucesso!');
            res.body.medico.should.have.property('cpf');
            res.body.medico.should.have.property('email');
            res.body.medico.should.have.property('nome');
            res.body.medico.should.have.property('crm');
        done();
        }); 
    });
});


/** 
 * Teste da rota: /GET/:id
 */
describe('/GET/:id medico',()=> {
    it('Deve retornar um medico dado o id',(done) => {
        var medico = new medico( {
            cpf: "000011111111",
            email: "teste@TEste",
            nome: "jao",
            dataNascimento: "1983-03-18",
            crm: "123456",
            estadoRegistroCRM: "Distro Federal",
            sexo: "F",
            senha: "123456",
            confirmacaoSenha: "123456"
        });
        medico.save((error, medico) =>{
            chai.request(server)
            .get('/medico/' + medico.id)
            .send(medico)
            .end((error, res) => {
               res.should.be.a('object');
               res.body.should.have.property('cpf'); 
               res.body.should.have.property('email');
               res.body.should.have.property('nome');
               res.body.should.have.property('crm');
               res.body.should.have.property('_id').eql(medico.id);              
        done();
            });
        });
    });
});

/** 
 * Teste da rota: /PUT/:id
 */
describe('/PUT/:id medico',()=> {
	  it('Deve atualizar um medico dado o id',(done)=>{
	  	var medico = new medico({cpf: "0000111111112", nome: "jao"})
	  	medico.save((error, medico) => {
				chai.request(server)
			    .put('/medico/' + medico.id)
			    .send({cpf: "0000111111112", nome: "jao"})
			    .end((error, res)=> {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('medico Atualizado com Sucesso');
				  	res.body.medico.should.have.property('crm').eql(123456);
	            done();
            });
        });
    });
});

/** 
 * Teste da rota: /DELETE/:id
 */
describe('/DELETE/:id medico',() => {
	  it('Deve excluir um medico dado o id',(done)=>{
	  	var medico = new medico({cpf: "000011111112", nome: "jao"})
	  	medico.save((error, medico) => {
				chai.request(server)
			    .delete('/medico/' + medico.id)
			    .end((error, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('medico excluído com Sucesso!');
			      done();
			    });
		  });
	  });
   });
});