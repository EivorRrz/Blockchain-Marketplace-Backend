const { ethers } = require('ethers');

exports.verifySignature = (walletAddress, signature, challenge) => {
    try {
        // ethers.verifyMessage is available in ethers v6
        const recoveredAddress = ethers.verifyMessage(challenge, signature);
        return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
    } catch (error) {
        return false;
    }
};
