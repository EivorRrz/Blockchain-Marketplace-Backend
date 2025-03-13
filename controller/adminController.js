const User = require('../models/User.js');
const Item = require('../models/Item.js');
const Transaction = require('../models/Transaction.js');
const Auction = require('../models/Auction.js');

exports.getDashboardData = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalItems = await Item.countDocuments();
        const totalTransactions = await Transaction.countDocuments();
        const activeAuctions = await Auction.countDocuments({ status: 'active' });
        res.json({ totalUsers, totalItems, totalTransactions, activeAuctions });
    } catch (error) {
        next(error);
    }
};
