'use strict';
const mongoose = require('mongoose');
const Medico = mongoose.model('Medico')

exports.get = async () => {
    const res = await Medico.find();
    return res;
}

exports.create = async (data) => {
    var medico = new Medico(data);
    return await medico.save();
}

exports.authenticate = async (data) => {
    return await Medico.findOne({
        ...data
    });
}

exports.getById = async (id) => {
    const res = await Medico.findById(id);
    return res;
}
exports.update = async(id, data) => {
    await Medico
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

exports.delete = async(id) => {
    await Product
        .findOneAndRemove(id);
}