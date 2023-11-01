const User = require('../../models/User')
const Reviews = require('../../models/Review');
const Connection = require('../../models/Connection');
const Wallet =require('../../models/Wallet')
const Stripe =require('stripe')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key : process.env.CLOUD_KEY,
  api_secret:process.env.CLOUD_KEY_SECRET
})

const profile = async (req, res) => {
  try {
    const userId = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    // Get the filename of the new image
    const newFilePath = file.filename;
      // Upload selectedImage to Cloudinary
      const imageUploadResult = await cloudinary.uploader.upload(file.path, {
        folder: 'User', // Specify the folder name
      });
      const imageUrl = imageUploadResult.secure_url;
    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user already has a displayPic
    if (user.displayPic && user.displayPic.length > 0) {
      // Replace the first item in the displayPic array with the new filename
      user.displayPic[0] = imageUrl;
    } else {
      // If there's no existing displayPic, create a new array with the new filename
      user.displayPic = [imageUrl];
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({data:imageUrl ,message: 'Display picture updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

  

  const changeName = async(req,res)=>{
    try {
      const userId = req.params.id;
      const newName =req.body.newUsername
    const user = await User.updateOne( { _id: userId },{ $set: { username: newName } } );
    const users = await User.find({ _id: userId })
    const data =users[0].username
    console.log(data);
    return res.status(200).json(data)
    } catch (error) {
      console.log(error);
    }
  }
  const changeEmail = async(req,res)=>{
    try {
      // console.log('====================================');
      // console.log("k");
      // console.log('====================================');
      const userId = req.params.id;
      const newEmail =req.body.newUsername
    const user = await User.updateOne( { _id: userId },{ $set: { email: newEmail } } );
    const users = await User.find({ _id: userId })
    const data =users[0].email
    console.log(data);
    return res.status(200).json(data)
    } catch (error) {
      console.log(error);
    }
  }
  const changeNumber = async(req,res)=>{
    try {
      // console.log('====================================');
      // console.log("kkkkkk");
      // console.log('====================================');
      const userId = req.params.id;
      const newNumber =req.body.newUsername
    const user = await User.updateOne( { _id: userId },{ $set: { mobile: newNumber } } );
    const users = await User.find({ _id: userId })
    const data =users[0].mobile
    console.log(data,"ssssssssssss");
    return res.status(200).json(data)
    } catch (error) {
      console.log(error);
    }
  }

  const getProfile = async(req,res)=>{
   // console.log('profile');
    try {
      const userId = req.params.id;
      const users = await User.find({ _id: userId })
      const newData = users[0]
      //console.log(newData,"yyyyyyyyy");
      return res.status(200).json(newData)
    } catch (error) {
      console.log(error);
    }
  }

  const changeWallpapper=async(req,res)=>{
   
console.log("sndhbdhb");
console.log(req.body,"sndhbdhb");
  }




  const submitReview=async(req,res)=>{
    try {
      const { Review, Rating, user1Id, user2Id } = req.body;
 
  const connection = await Connection.findOne({
    $and: [
      { $or: [{ driverId: user1Id }, { riderId: user1Id }] },
      { $or: [{ driverId: user2Id }, { riderId: user2Id }] },
      {isConnected:true}
    ]
  });
 
   let matchedId;
  if (connection.driverId.equals(user1Id)) {
   // matchedId = connection.driverId;
    matchedId = 'driver'
  } else {
   // matchedId = connection.riderId;
    matchedId = 'rider'
  } 
  
  console.log('====================================');
  console.log(matchedId);
  console.log('====================================');
// Create a new Review document based on conditions
const newReview = new Reviews({
  Rider: matchedId === 'rider' ? user1Id : user2Id,
  Driver: matchedId === 'driver' ? user1Id : user2Id,
  isRider: matchedId === 'rider',
  isDriver: matchedId === 'driver',
  star: Rating, // Assuming Rating contains the star rating
  review: Review
});

await newReview.save(); // Save the new Review document

return res.status(200).json({ message: 'Review submitted successfully' });
    } catch (error) {
      console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  const getreviews=async(req,res)=>{
    try {
      
      const userId = req.params.id;
      console.log(userId);
      const cleanedId = userId.replace(/^:/, "").replace(/"$/, "");
      console.log(cleanedId);
      const reviews = await Reviews.find({
        $or: [
          { Rider: cleanedId, isRider: false },
          { Driver: cleanedId, isDriver: false },
        ],
      })
        .populate('Rider')
        .populate('Driver');
      
      console.log('====================================');
      console.log(reviews);
      console.log('====================================');
          // Create a new array to store the filtered results
    const filteredReviews = reviews.map((review) => {
      if (review.isRider === false) {
        // If it's not a Rider review, select Rider, star, and review
        return {
          Rider: review.Rider,
          star: review.star,
          review: review.review,
        };
      } else {
        // Otherwise, select Driver, star, and review
        return {
          Driver: review.Driver,
          star: review.star,
          review: review.review,
        };
      }
    });

    return res.status(200).json(filteredReviews);
    } catch (error) {
      console.log(error);
    }
  }

  const comformRide = async (req, res) => {
    try {
      const { ConnectionId, PaymentInfo } = req.body;
  
      // Find the Connection with the given ConnectionId and update rideComformed to true
      const updatedConnection = await Connection.findOneAndUpdate(
        { _id: ConnectionId },
        { rideComformed: true }
      );
  
      if (!updatedConnection) {
        return res.status(404).json({ message: 'Connection not found' });
      }
  
      // Optionally, you can update other fields as needed, e.g., PaymentInfo
  
      return res.status(200).json({ message: 'Ride confirmed successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const checkout = async (req, res) => {
    console.log(req.body, "kkkkkkkkkkkkkkkkkkkkkkkkkk");
    const { Id, PaymentInfo, RideInfo } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'inr',
              unit_amount: PaymentInfo * 10, // Assuming PaymentInfo is the amount in cents
              product_data: {
                name: 'Confirm your ride with Payment',
                description:
                  'This amount is Only 10% of the Actual amount, So you must Pay the balance amount by hand',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        cancel_url: `${process.env.CLIENT_URL}/connection`,
      });
  
      // If the payment is successful, create a new Wallet document
      if (session && session.url) {
        // Calculate 10% of PaymentInfo
        
  
        let wallet = await Wallet.findOne({ UserId: RideInfo.user });
        const tenPercentAmount = PaymentInfo * 0.1;
        if (wallet) {
          // If the wallet document exists, update it
          wallet.Amount += tenPercentAmount;
          wallet.history.push({
            value: tenPercentAmount,
            SenderId: Id,
          });
    
          await wallet.save();
          
        } else {
          // If the wallet document doesn't exist, create a new one
          wallet = new Wallet({
            UserId: RideInfo.user,
            Amount: tenPercentAmount,
            history: [
              {
                value: tenPercentAmount,
                SenderId: Id,
              },
            ],
          });
    
          await wallet.save();
          
        }
      }
  
      res.send({ url: session.url });
    } catch (error) {
      console.error('An error occurred:', error.message);
      res.status(500).send('An error occurred while creating the checkout session.');
    }
  };



  
  const getWallet = async (req, res) => {
    const userId = req.params.id;
  console.log(userId,"hhhhhhhhhhhhhhh");
    try {
      // Find the Wallet document with the specified userId and populate UserId and SenderId
      const wallet = await Wallet.findOne({ UserId: userId })
        .populate("UserId")
        .populate("history.SenderId");
 // console.log(wallet.history[0].SenderId,"hhhdhdhd");
      if (!wallet) {
        // Handle the case where the wallet is not found
        return res.status(404).json({ message: "Wallet not found" });
      }
  
      // Send the populated wallet document as the response
      return res.status(200).json(wallet);
    } catch (error) {
      console.error("An error occurred:", error.message);
      res.status(500).send("An error occurred while fetching the wallet.");
    }
  };
  
 
  

  module.exports = { profile , changeName,getProfile,changeNumber,changeEmail,changeWallpapper,submitReview,getreviews,comformRide,checkout,getWallet};
  