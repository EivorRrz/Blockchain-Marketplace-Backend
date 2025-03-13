const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ buyer: req.user.id }, { seller: req.user.id }]
        }).populate('item', 'title price')
          .populate('buyer', 'walletAddress profile.username')
          .populate('seller', 'walletAddress profile.username');
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};
