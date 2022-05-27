const AccountModel = require('../models/Account');
const UserModel = require('../models/User');

exports.create = async (req, res) => {
    const {name, description, amount} = req.body;

    const account = new AccountModel({name, description, amount});
    const user = await UserModel.findOne({id: req.user.id});

    account.user = req.user.id;

    try {
        await account.save();
        user.accounts.push(account.id);
        await user.save();

        return res.status(200).json(account);
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
}

exports.delete = async (req, res) => {
    try {
        const user = await UserModel.findOne({id: req.user.id});
        const account = await AccountModel.findById(req.params.id);


        if (!account || !user)
            return res.status(404).json({message: "not found!"});

        let hasAccess = false;
        user.accounts.forEach(userAcc => {
            if (userAcc.equals(account.id))
                hasAccess = true;
        });


        if (hasAccess) {
            await account.remove();
            return res.status(200).json({message: "success!"});
        } else {
            return res.status(500).json({message: "you have no permission!"});
        }
    } catch (e) {
        return res.status(500).json({message: "couldn't find!"})
    }
}

exports.all = async (req, res) => {
    const accounts = await AccountModel.find({user: req.user.id});

    res.send(accounts);
}