process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Prescricao = require('../src/models/prescricao');


var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/server');
var should = chai.should();

chai.use(chaiHttp);


describe('Prescricao', () => {
    beforeEach((done) => {

        Prescricao.deleteOne({},(error)=> {
            done();
        });
    });

/** 
 * Teste da rota: /GET
 */
describe('/GET prescricao',() => {
    it('Deve retornar todos os prescricao',(done)=> {
        chai.request(server)
        .get('/prescricao')
        .end((error, res)=> {
            //Se tudo der certo deve retornar o status: 200 - OK
            res.should.have.status(200);
            //E em seguida retornar em um array todos os prescricaos cadastrados na base de dados:
            res.body.should.be.a('array');
            //res.body.length.should.be.eql(0);
        done();
        });
    });
});

/** 
 * Teste da rota: /POST
 */
describe('/POST prescricao',() => {
    it('Não deve retornar o POST do prescricao criado, uma vez que não foi definido o campo: paginas',(done) => {
       
        //Aqui simulamos a criação de um prescricao, porém sem definir o prescricao:
        var prescricao = {
            cpfPaciente: "123456789",
            nomePaciente: "teste prescricao",
            dataNascimentoPaciente: "1983-03-18",
            descricaoMedicamento: "teste teste teste"
        }
        chai.request(server)
        .post('/prescricao')
        .send(prescricao)
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('sexo');
            res.body.errors.sexo.should.have.property('kind').eql('required');
            done();
        });
    });
    
    it('Deve Criar um prescricao',(done) => {
        var prescricao = {
            cpfPaciente: "123456789",
            nomePaciente: "teste prescricao",
            dataNascimentoPaciente: "1983-03-18",
            descricaoMedicamento: "teste teste teste"
        } 
        chai.request(server)
        .post('/prescricao')
        .send(prescricao)
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('prescricao adicionado com Sucesso!');
            res.body.prescricao.should.have.property('cpf');
            res.body.prescricao.should.have.property('email');
            res.body.prescricao.should.have.property('nome');
            res.body.prescricao.should.have.property('crm');
        done();
        }); 
    });
});


/** 
 * Teste da rota: /GET/:id
 */
describe('/GET/:id prescricao',()=> {
    it('Deve retornar um prescricao dado o id',(done) => {
        var prescricao = new prescricao( {
            cpfPaciente: "123456789",
            nomePaciente: "teste prescricao",
            dataNascimentoPaciente: "1983-03-18",
            descricaoMedicamento: "teste teste teste"
        });
        prescricao.save((error, prescricao) =>{
            chai.request(server)
            .get('/prescricao/' + prescricao.id)
            .send(prescricao)
            .end((error, res) => {
               res.should.be.a('object');
               res.body.should.have.property('cpf'); 
               res.body.should.have.property('email');
               res.body.should.have.property('nome');
               res.body.should.have.property('crm');
               res.body.should.have.property('_id').eql(prescricao.id);              
        done();
            });
        });
    });
});

/** 
 * Teste da rota: /PUT/:id
 */
describe('/PUT/:id prescricao',()=> {
	  it('Deve atualizar um prescricao dado o id',(done)=>{
	  	var prescricao = new prescricao({cpfPaciente: "23456789",nomePaciente: "teste prescricao"})
	  	prescricao.save((error, prescricao) => {
				chai.request(server)
			    .put('/prescricao/' + prescricao.id)
			    .send({cpfPaciente: "23456789",nomePaciente: "teste prescricao"})
			    .end((error, res)=> {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('prescricao Atualizado com Sucesso');
				  	res.body.prescricao.should.have.property('cpfPaciente').eql(123456789);
	            done();
            });
        });
    });
});

/** 
 * Teste da rota: /DELETE/:id
 */
describe('/DELETE/:id prescricao',() => {
	  it('Deve excluir um prescricao dado o id',(done)=>{
	  	var prescricao = new prescricao({cpf: "000011111112", nome: "jao"})
	  	prescricao.save((error, prescricao) => {
				chai.request(server)
			    .delete('/prescricao/' + prescricao.id)
			    .end((error, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('prescricao excluído com Sucesso!');
			      done();
			    });
		  });
	  });
   });
});