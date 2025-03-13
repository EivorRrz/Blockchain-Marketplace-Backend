const jwt = require('jsonwebtoken');
const { verifySignature } = require('../utils/verifySignature');
const User = require('../models/User');

exports.login = async (req, res, next) => {
    try {
        const { walletAddress, signature } = req.body;
        
        // In a real implementation, the challenge should be unique per login attempt.
        const challenge = "Please sign this challenge to login";
        
        const isValidSignature = verifySignature(walletAddress, signature, challenge);
        if (!isValidSignature) {
            return res.status(401).json({ message: 'Invalid signature' });
        }
        
        // Find or create the user
        let user = await User.findOne({ walletAddress });
        if (!user) {
            user = new User({ walletAddress, reputation: 0 });
            await user.save();
        }
        
        const token = jwt.sign({ id: user._id, walletAddress: user.walletAddress }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user });
    } catch (error) {
        next(error);
    }
};
