const  Connection =require('../../models/Connection') 
const Chat = require('../../models/Chat')
const User = require('../../models/User')
const Message = require('../../models/Message')


const getActiveConnections = async (req, res) => {
  try {
    const Id = req.params.id;
    // console.log(Id);
    const activeConnections = await Connection.find({
      $or: [
        { driverId: Id },
        { riderId: Id },
      ],
      isConnected: true,
    })
      .populate('driverId')
      .populate('riderId')
      .populate('rideInfo');

      const userDetailsArray = [];
      const userDetailsSet = new Set(); // Create a Set to store unique user IDs
      
      activeConnections.forEach((connection) => {
        const userId = connection.driverId._id.toString() !== Id.toString()
          ? connection.driverId._id.toString()
          : connection.riderId._id.toString();
      
        if (!userDetailsSet.has(userId)) {
          userDetailsSet.add(userId);
      
          userDetailsArray.push({
            connectionId: connection._id,
            userDetails: connection.driverId._id.toString() !== Id.toString()
              ? connection.driverId
              : connection.riderId,
            rideInfo: connection.rideInfo,
          });
        }
      });

    // console.log(userDetailsArray, 'll');

    return res.status(200).json(userDetailsArray);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getChatId = async (req, res) => {
    const { Id1, Id2 } = req.query;
    // console.log(Id1, Id2,"???////");
    try {
        // Assuming you have a Chat model defined and can access your MongoDB collection
        const chat = await Chat.findOne({
            users: {
                $all: [Id1, Id2]
            }
        });

        if (chat) {
            // If a chat document is found, you can access its _id
            const chatId = chat._id;
            res.status(200).json({ chatId });
        } else {
            // If no chat document is found, you can handle it accordingly
            res.status(404).json({ message: "Chat not found" });
        }}catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getallChat=async(req,res)=>{
try {
    const Id = req.params.id;

    Chat.find({ users: { $elemMatch: { $eq:Id } } })
    .populate("users", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "username displayPic email",
      });
      // console.log(results);
      res.status(200).json(results);
    });
    
    // const chats =await Chat.find({})
    console.log(chats);
    // return res.status(200).json(chats)
} catch (error) {
    // console.log(error);
}
  }
  
 

  const message = async (req, res) => {
      const { content, chatId, senderId } = req.body;
  
      if (!content || !chatId || !senderId) {
          // console.log("Invalid data passed into request");
          return res.sendStatus(400);
      }
  
      try {
          // Create a new message
          const newMessage = new Message({
              sender: senderId,
              content: content,
              chat: chatId,
          });
  
          // Save the message
          await newMessage.save();
  
          // Find the newly created message with populate
          const populatedMessage = await Message.findById(newMessage._id)
              .populate('sender', 'username displayPic')
              .populate('chat')
              .exec();
  
          // Assuming you have a User model for populating "chat.users"
          await User.populate(populatedMessage.chat, {
              path: 'users',
              select: 'username displayPic email',
          });
  
          // Update the latestMessage field in the Chat model
          await Chat.findByIdAndUpdate(chatId, { latestMessage: populatedMessage });
  
          res.json(populatedMessage);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
      }
  };
  
  const getmessage=async (req,res)=>{
    console.log( req.params.id,"😍");
    try {
        const messages = await Message.find({ chat: req.params.id })
          .populate("sender", "username displayPic email")
          .populate("chat");
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
  }
  const blockUserbyUser = async (req, res) => {
    const { Id1, Id2 } = req.query;
    // console.log(Id1, Id2, "???////");
  
    try {
      const filter = {
        $or: [
          { driverId: Id1, riderId: Id2 },
          { driverId: Id2, riderId: Id1 }
        ]
      };
  
      const update = {
        $set: { isConnected: false }
      };
  
      const options = { new: true }; // Return the updated document
  
      const updatedConnection = await Connection.findOneAndUpdate(filter, update, options);
  
      if (updatedConnection) {
        // The document was found and updated successfully
        // console.log('Document updated:', updatedConnection);
        res.status(200).json({ message: 'User blocked successfully', data: updatedConnection });
      } else {
        // No document matching the filter was found
        // console.log('Document not found or not updated.');
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports ={getActiveConnections,getallChat,getChatId,message,getmessage,blockUserbyUser}