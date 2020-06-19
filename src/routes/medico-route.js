'use strict';

const express = require('express');
const router = express.Router();

const medicoController = require('../controllers/medico-controller')

router.get('/', medicoController.get)
router.get('/admin/:id', medicoController.getById)
router.post('/', medicoController.post)
router.put('/:id', medicoController.put)
router.delete('/', medicoController.delete)

module.exports = router;  