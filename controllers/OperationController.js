const OperationModel = require('../models/Operation');
const CategoryModel = require('../models/Category');
const AccountModel = require('../models/Account');
const {validationResult} = require("express-validator");
const UserModel = require("../models/User");


exports.all = async (req, res) => {
    const operations = await OperationModel.find({user: req.user.id});

    res.send(operations);
}

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors});
    }

    const {description, amount, category, account} = req.body;

    const operation = new OperationModel({description, amount, category, account});
    const user = await UserModel.findOne({id: req.user.id});
    operation.user = req.user.id;

    try {
        const cat = await CategoryModel.findById(category);
        const acc = await AccountModel.findById(account);

        const money = acc.amount;
        if (cat.categoryType === 'income')
        {
            await AccountModel.findByIdAndUpdate(account, {amount: money + amount});
        }
        else
        {
            await AccountModel.findByIdAndUpdate(account, {amount: money - amount});
        }

        await operation.save();
        user.operations.push(operation.id);
        await user.save();

        return res.status(200).json(operation);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
exports.delete = async (req, res) => {
    const operation = await OperationModel.findById(req.params.id);
    if (!operation)
        return res.status(404).json({message : "not found"});

    let account = await AccountModel.findById(operation.account);
    let category = await CategoryModel.findById(operation.category);

    let resultAmount = 0;
    console.log(account);
    console.log(operation);

    if (category.categoryType === 'income')
    {
        resultAmount = account.amount - operation.amount;
    }
    else {
        resultAmount = account.amount + operation.amount;
    }
    try {
        await AccountModel.findByIdAndUpdate(operation.account, {amount: resultAmount});
        await OperationModel.findByIdAndRemove(req.params.id);
    } catch (e) {
        return res.status(500).json({message: e.message});
    }

    return res.status(200).json({message: "success"});
}

/*exports.incomes = async (req, res) => {
    const categories = await CategoryModel.find({user: req.user.id, categoryType: "income"});
    const operations = await OperationModel.find({user: req.user.id});
}

exports.outcomes = async (req, res) => {

}*/


