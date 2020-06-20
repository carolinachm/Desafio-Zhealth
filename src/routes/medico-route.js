'use strict';

const express = require('express');
const router = express.Router();

const medicoController = require('../controllers/medico-controller')

const authSevice = require('../services/auth-service')

router.get('/', medicoController.get)
router.get('/admin/:id', medicoController.getById)
router.post('/', authSevice.authorize, medicoController.post)
router.post('/authenticate', medicoController.authenticate)
router.post('/refresh-token', authSevice.authorize, medicoController.refreshToken)
router.put('/:id', medicoController.put)
router.delete('/', medicoController.delete)


module.exports = router;  