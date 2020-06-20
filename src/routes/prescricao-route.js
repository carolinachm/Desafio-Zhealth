'use strict';

const express = require('express');
const router = express.Router();

const prescricaoController = require('../controllers/prescricao.controller')


const authSevice = require('../services/auth-service')


router.get('/', prescricaoController.get)
router.get('/admin/:id', authSevice.authorize,prescricaoController.getById)
router.post('/',authSevice.isAdmin, prescricaoController.post)
router.put('/:id',authSevice.isAdmin, prescricaoController.put)




module.exports = router;