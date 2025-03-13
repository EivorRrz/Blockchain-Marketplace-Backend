//Using the Ether.JS!!!

//req the modules Here!!
const { ethers } = require("ethers"); //to interact with blockChain!
const fs = require("fs");
const path = require("path"); //for reading the contract  which tell how to deal with Smart contract !
require("dotenv").config(); //loads the env!

//Loading the Smart Contract ABI
const contractABI = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../contracts/MarketplaceABI.json"),
    "utf8"
  )
);
const contractAddress = process.env.CONTRACT_ADDRESS;

//Connecting to the Blockchain
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);


//1:creat a nft and sale it!
exports.mintAndList = async (walletAddress, price) => {
  try {
    const tx = await contract.mintAndList(walletAddress, price);
    const receipt = await tx.wait();
    const event = receipt.events.find((e) => e.event === "ItemMinted");
    return event.args.tokenId.toNumber();
  } catch (error) {
    throw new Error("Blockchain minting failed: " + error.message);
  }
};

//2:Mark for the Sold One
exports.markItemAsSold = async (tokenId) => {
  try {
    const tx = await contract.markAsSold(tokenId);
    await tx.wait();
    return true;
  } catch (error) {
    throw new Error("Blockchain mark as sold failed: " + error.message);
  }
};
