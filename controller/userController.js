const User = require('../models/User.js');

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { username, bio, avatar } = req.body;
        const user = await User.findById(req.user.id);
        if (username) user.profile.username = username;
        if (bio) user.profile.bio = bio;
        if (avatar) user.profile.avatar = avatar;
        await user.save();
        res.json(user);
    } catch (error) {
        next(error);
    }
};
