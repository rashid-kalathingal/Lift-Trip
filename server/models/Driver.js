const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    pickUp: {
      type: String,
      required: true 
    },
    dropOff: {
      type: String,
      required: true 
    },
    date: {
      type: String,
      required: true 
    },
    VehicleModel: {
      type: String,
      required: true 
    },
    VehicleNumber: {
      type: String,
      required: true 
    },
    NumberOfSeats: {
      type: Number,
      required: true 
    },
    AvailableSpace: {
      type: String,
      required: true 
    },
    VehicleImage: [
      { type: String }
    ],
    VehicleRC: [
      { type: String }
    ],
    VehicleInsurance: [
      { type: String }
    ],
    Instruction: {
      type: String,
      
    },
    Payment: {
      type: String,
      required: true 
    },
    report: [
      { type: String }
    ],
    Block: [
      { type: String, required: true }
    ],
    Verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Driver', DriverSchema);
