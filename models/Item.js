const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["listed", "sold"], default: "listed" },
  ipfsHash: { type: String },
  createdAt: { type: Date, default: Date.now },
  blockchainData: {
    tokenId: { type: Number },
    contractAddress: { type: String },
  },
});

module.exports = mongoose.model("Item", itemSchema);
