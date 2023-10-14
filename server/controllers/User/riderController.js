const Driver = require('../../models/Driver')
const Connection = require('../../models/Connection')
const Chat = require('../../models/Chat')
const getrides  = async (req, res) => {
    try {
        //console.log('hellooo rides')
        const rides = await Driver.find({Verified: true}).populate("user");
        //console.log(rides);
        return res.status(200).json(rides)
    } catch (error) {
        console.log(error);
    }
}

const getsinglerides =async (req,res)=>{
    //console.log("dcvbhdv");
try {
    const Id = req.params.id;
    const cleanedId = Id.replace(/^:/, "").replace(/"$/, "");
    const rides = await Driver.find({_id: cleanedId}).populate("user");
    const ride = rides[0]
    //console.log(ride,"//////////");
    return res.status(200).json(ride)
} catch (error) {
    console.log(error);
}
}

const makeConnection = async (req, res) => {
    try {
      console.log('====================================');
      console.log(req.body,"🔥🔥");
      console.log('====================================');
      const { DriverId, RiderId, RideInfo } = req.body;
  // console.log('====================================');
  // console.log(DriverId, RiderId, RideInfo);
  // console.log('====================================');
      const newConnection = new Connection({
        driverId: DriverId,
        riderId: RiderId,
        rideInfo: RideInfo,
        isConnected: false,
        rideComformed:false
      });
  
      await newConnection.save();
  
      // Create a new chat
      const newChat = new Chat({
        users: [DriverId, RiderId], 
    });

    // Save the new chat
    await newChat.save();
      console.log('Connection created successfully');
      res.status(201).json({ message: 'Connection created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the connection' });
    }
  };


 const myrideinfo=async (req,res)=>{
  const userId = req.params.id;
  try {
    // Use the $and operator to combine conditions
    const rides = await Connection.find({
      $and: [
        { $or: [{ driverId: userId }, { riderId: userId }] }, // Match either driverId or riderId
        { isConnected: true },
        { rideComformed: true },
      ],
    }).populate("rideInfo");
console.log(rides,"kkggdgdg");
    return res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
 }


module.exports = {getrides, getsinglerides,makeConnection,myrideinfo  };