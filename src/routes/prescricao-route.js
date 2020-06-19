'use strict';

const express = require('express');
const router = express.Router();

const prescricaoController = require('../controllers/prescricao.controllerr')

router.get('/', prescricaoController.get)
router.get('/admin/:id', prescricaoController.getById)
router.post('/', prescricaoController.post)
router.put('/:id', prescricaoController.put)




module.exports = router;