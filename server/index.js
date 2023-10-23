const express = require('express')
const mongoose = require("mongoose")
const connectDB= require('./db/config');
const dotenv = require('dotenv').config()
const cors = require('cors')
const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');
// const stripe =require('./routes/Stripe')
const app = express()
const {Server} =require('socket.io')

// Connect to MongoDB
connectDB();

// Use CORS and body parsers
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));




// Use user and admin routes
app.use('/api/auth', userRoutes); 
app.use('/api/adminAuth', adminRoutes);
// app.use('/auth/stripe', stripe);

// Start the server
const PORT = process.env.PORT || 5000;

const server =app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://lifttrip.ziasrote.live/",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    // console.log(newMessageRecieved,"😒😒");
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  //  // Emit a notification to the user when a new connection is made
  //  socket.on("newConnection", (notificationData) => {
  //   console.log('====================================');
  //   console.log('notification');
  //   console.log('====================================');
  //   socket.broadcast.to(notificationData.recipientUserId).emit("notification", notificationData);
  // });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});



// app.post('/upload', upload.single("image"), async(req, res) => {
//   return res.status(200).json({msg: "Successfully uploaded"})
// })

