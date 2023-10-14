const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle: [
    {
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
        { type: String },
      ],
      VehicleRC: [
        { type: String }
      ],
      VehicleInsurance: [
        { type: String }
      ]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
