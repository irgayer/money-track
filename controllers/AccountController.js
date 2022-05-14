const AccountModel = require('../models/Account');

exports.create = async (req, res) => {
    const account = new AccountModel({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount
    });

    await account.save().then(data => {
        res.send(account);
    }).catch(ex => {
        res.send(ex.message);
    })
}

exports.delete = async (req, res) => {
    const account = await AccountModel.findOneAndRemove({id: req.body.id});

    res.send("deleted");
}

exports.all = async (req, res) => {
    const accounts = await AccountModel.find();

    res.send(accounts);
}