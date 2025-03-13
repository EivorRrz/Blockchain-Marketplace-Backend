const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startingPrice: { type: Number, required: true },
  highestBid: { type: Number, default: 0 },
  highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bids: [
    {
      bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  status: { type: String, enum: ["active", "ended"], default: "active" },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Auction", auctionSchema);
