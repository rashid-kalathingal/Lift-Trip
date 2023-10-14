const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    Amount: {
      type: Number,
      required: true
    },
    history: [
      {
        value: {
          type: Number,
          required: true
        },
        SenderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wallet', WalletSchema);
