const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    walletAddress: { type: String, unique: true, required: true },
    reputation: { type: Number, default: 0 },
    profile: {
        username: { type: String },
        bio: { type: String },
        avatar: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
