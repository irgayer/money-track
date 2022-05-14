const CategoryModel = require('../models/Category');

exports.create = async (req, res) => {
    const category = new CategoryModel({
        name: req.body.name,
        description: req.body.description,
        categoryType: req.body.categoryType
    });

    await category.save().then(data => {
        res.send(category);
    }).catch(ex => {
        res.send(e.message)
    });
}

exports.delete = async (req, res) => {
    const category = await CategoryModel.findOneAndRemove({id: req.body.id});

    res.send('delete');
}

exports.all = async (req, res) => {
    const categories = await CategoryModel.find();

    res.send(categories);
}