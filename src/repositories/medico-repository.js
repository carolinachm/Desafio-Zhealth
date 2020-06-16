'use strict';
const mongoose = require('mongoose');

exports.create = async(data) => {
    var medico = new Medico(data);
    await medico.save();
}

exports.authenticate = async (data) => {
    const res = await Medico.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async (id) => {
    const res = await Medico.findById(id);
    return res;
}