const Item = require('../models/Item');
const { uploadToIPFS } = require('../utils/ipfs');
const blockchain = require('../utils/blockchain');

exports.createItem = async (req, res, next) => {
    try {
        const { title, description, price } = req.body;
        // If an image is provided (base64 string), upload to IPFS
        let ipfsHash = null;
        if (req.body.image) {
            ipfsHash = await uploadToIPFS(req.body.image);
        }
        // Interact with blockchain: mint NFT and list it for sale/trade
        const tokenId = await blockchain.mintAndList(req.user.walletAddress, price);
        
        const newItem = new Item({
            title,
            description,
            price,
            seller: req.user.id,
            ipfsHash,
            blockchainData: {
                tokenId,
                contractAddress: process.env.CONTRACT_ADDRESS
            }
        });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

exports.getItems = async (req, res, next) => {
    try {
        // Use query parameters for advanced filtering
        const { title, minPrice, maxPrice } = req.query;
        let filter = { status: 'listed' };
        if (title) filter.title = { $regex: title, $options: 'i' };
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        const items = await Item.find(filter).populate('seller', 'walletAddress profile.username');
        res.json(items);
    } catch (error) {
        next(error);
    }
};

exports.getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id).populate('seller', 'walletAddress profile.username');
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        next(error);
    }
};

exports.markAsSold = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        // Ensure only the seller can mark the item as sold
        if (item.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        item.status = 'sold';
        await item.save();

        // Update blockchain: mark NFT as sold
        await blockchain.markItemAsSold(item.blockchainData.tokenId);
        
        res.json({ message: 'Item marked as sold', item });
    } catch (error) {
        next(error);
    }
};
