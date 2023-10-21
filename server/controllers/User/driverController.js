const Vehicle = require('../../models/Vehicle');
const Driver = require('../../models/Driver')
const Connection =require('../../models/Connection')
const vehicle = async (req, res) => {
  try {
    // Destructure vehicle data from req.body
    console.log(req.body, "bodyyyyy vehicle")
    let { user, model, Number, seats, space } = req.body;

    user = JSON.parse(user)
    
     // Handle file uploads using multer
    const selectedImage = req.files.selectedImage[0];
    const selectedRC = req.files.selectedRC[0];
    const selectedInsurance = req.files.selectedInsurance[0];
   

    // Find the existing Vehicle document by user ID
    const existingVehicle = await Vehicle.findOne({ user: user._id });

    if (existingVehicle) {
      // If the document exists, update it with the new vehicle data
      existingVehicle.vehicle.push({
        VehicleModel: model,
        VehicleNumber: Number,
        NumberOfSeats: seats,
        AvailableSpace: space,
        VehicleImage: selectedImage.filename, // Store the original filename
        VehicleRC: selectedRC.filename, // Store the original filename
        VehicleInsurance: selectedInsurance.filename, // Store the original filename
      });

      // Save the updated document
      const savedVehicle = await existingVehicle.save();

      res.status(201).json(savedVehicle);
    } else {
      // If no existing document is found, create a new one
      const newVehicle = new Vehicle({
        user: user._id,
        vehicle: [
          {
            VehicleModel: model,
            VehicleNumber: Number,
            NumberOfSeats: seats,
            AvailableSpace: space,
            VehicleImage: selectedImage.filename, // Store the original filename
            VehicleRC: selectedRC.filename, // Store the original filename
            VehicleInsurance: selectedInsurance.filename, // Store the original filename
          }
        ]
      });

      // Save the new Vehicle document to the database
      const savedVehicle = await newVehicle.save();

      res.status(201).json(savedVehicle);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while saving the vehicle.' });
  }
};


const getVehicles =async(req,res)=>{
  console.log("kk");
  try {
    const userId = req.params.id;
    console.log(userId);
    const vehicles = await Vehicle.find({ user: userId });
const extractedVehicle = vehicles.map(vehicleDoc => vehicleDoc.vehicle);
const extractedVehicles =extractedVehicle[0]
console.log(extractedVehicles);
return res.status(200).json(extractedVehicles)
  } catch (error) {
    return res.status(500).json(error)
  }
}


const ride = async (req, res) => {
  console.log('👍👍👍👍');
  try {
    const {
      user,
      pickUpOption,
      dropOffOption,
      date,
      vehicleModel,
      vehicleNumber,
      numberOfSeats,
      availableSpace,
      vehicleImage,
      vehicleRC,
      VehicleInsurance,
      instructions,
      radioPaymentArray,
    } = req.body;
  
    const Availablevehicle = await Driver.find({VehicleNumber:vehicleNumber})
    console.log('====================================');
    console.log(Availablevehicle);
    console.log('====================================');
    let isVerified = false;
 if(Availablevehicle.length>0){
  isVerified=true;
  }

    const newDriver = new Driver({
      user: user._id, 
      pickUp: pickUpOption,
      dropOff: dropOffOption,
      date,
      VehicleModel: vehicleModel, 
      VehicleNumber: vehicleNumber, 
      NumberOfSeats: numberOfSeats, 
      AvailableSpace: availableSpace, 
      VehicleImage: [vehicleImage], 
      VehicleRC: [vehicleRC], 
      VehicleInsurance: [VehicleInsurance], 
      Instruction: instructions.join(', '), 
      Payment: radioPaymentArray.join(', '), 
      report: [], 
      Block: [], 
      Verified: isVerified, 
    });
    await newDriver.save();

    res.status(201).json({ message: 'Driver created successfully', driver: newDriver });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getconnections= async (req,res)=>{
  
  try {
    const driId = req.params.id;
   // console.log(driId,"make connection fast");
    const connections = await Connection.find({ driverId: driId ,isConnected:false }).populate('driverId').populate('riderId');
    // console.log(connections,":::::::Ssss");
    const arrayOfArrays = connections.map(connection => [connection]);
     //console.log(arrayOfArrays,";;;");
    return res.status(200).json(arrayOfArrays)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const acceptconnection =async(req,res)=>{
try {
  const connection =await Connection.findById(req.params.id)
  console.log(connection);
  connection.isConnected= true;
          await connection.save(); 
} catch (error) {
  console.log(error);
}
}
const rejectionconnection = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id);
    console.log(connection);

    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    // Use deleteOne method to delete the selected connection
    await Connection.deleteOne({ _id: req.params.id });

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { vehicle ,getVehicles,ride,getconnections,acceptconnection,rejectionconnection};
