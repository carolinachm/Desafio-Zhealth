'use strict';
const mongoose = require('mongoose');
const Prescricao = mongoose.model('Prescricao');

exports.get = async() => {
    const res = await Prescricao.find({}, 'medico')
    .populate('customer', 'nome');
    return res;
}


exports.getById = async(id) => {
    const res = await Prescricao
        .findById(id);
    return res;
}


exports.create = async(data) => {
    var prescricao = new Prescricao(data);
    await prescricao.save();
}

exports.update = async(id, data) => {
    await Prescricao
        .findByIdAndUpdate(id, {
            $set: {
              
                description: data.description,
               
            }
        });
}


