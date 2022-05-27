const CategoryModel = require('../models/Category');
const UserModel = require('../models/User');
const {validationResult} = require("express-validator");

exports.create = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
    {
        return res.status(400).json({message: errors});
    }

    const {name, description, categoryType} = req.body;

    const category = new CategoryModel({name,description,categoryType});
    const user = await UserModel.findOne({id: req.user.id});

    category.user = req.user.id;

    try {
        await category.save();
        user.categories.push(category.id);
        await user.save();

        return res.status(200).json(category);
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

exports.delete = async (req, res) => {
    try {
        const user = await UserModel.findOne({id: req.user.id});
        const category = await CategoryModel.findById(req.params.id);


        if (!category || !user)
            return res.status(404).json({message: "not found!"});

        let hasAccess = false;
        user.categories.forEach(userCat => {
            if (userCat.equals(category.id))
                hasAccess = true;
        });


        if (hasAccess) {
            await category.remove();
            return res.status(200).json({message: "success!"});
        } else {
            return res.status(500).json({message: "you have no permission!"});
        }
    } catch (e) {
        return res.status(500).json({message: "couldn't find!"})
    }
}

exports.all = async (req, res) => {
    const categories = await CategoryModel.find({user: req.user.id});

    res.send(categories);
}