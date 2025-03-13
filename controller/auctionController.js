const Auction = require('../models/Auction');
const Item = require('../models/Item');

exports.createAuction = async (req, res, next) => {
    try {
        const { itemId, startingPrice, endTime } = req.body;
        // Verify the item exists and belongs to the user
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        if (item.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to auction this item' });
        }
        const auction = new Auction({
            item: itemId,
            seller: req.user.id,
            startingPrice,
            endTime
        });
        await auction.save();
        res.status(201).json(auction);
    } catch (error) {
        next(error);
    }
};

exports.placeBid = async (req, res, next) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        if (auction.status !== 'active') {
            return res.status(400).json({ message: 'Auction is not active' });
        }
        const { bidAmount } = req.body;
        if (bidAmount <= auction.highestBid || bidAmount < auction.startingPrice) {
            return res.status(400).json({ message: 'Bid amount too low' });
        }
        auction.highestBid = bidAmount;
        auction.highestBidder = req.user.id;
        auction.bids.push({ bidder: req.user.id, amount: bidAmount });
        await auction.save();
        res.json(auction);
    } catch (error) {
        next(error);
    }
};

exports.getAuction = async (req, res, next) => {
    try {
        const auction = await Auction.findById(req.params.id)
            .populate('item')
            .populate('seller', 'walletAddress profile.username')
            .populate('highestBidder', 'walletAddress profile.username');
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        res.json(auction);
    } catch (error) {
        next(error);
    }
};
