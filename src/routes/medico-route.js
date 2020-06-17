'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/medico-controller')
const authService = require('../services/auth-service');

router.get('/', controller.get)
router.get('/:id', controller.getById);
router.post("/", controller.post);
// router.put("/:id",controller.put);
// router.delete("/", controller.delete);

router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);



module.exports = router;  