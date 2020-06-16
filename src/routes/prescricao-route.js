'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/prescricao-controller');
const authService = require('../services/auth-service');


router.get('/', controller.get);
router.get('/admin/:id', controller.getById);
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);


module.exports = router;