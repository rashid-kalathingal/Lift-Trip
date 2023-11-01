const adminController = require("express").Router()
const User = require("../../models/User")
const Driver =require("../../models/Driver")
const Connection=require('../../models/Connection')
const Place = require('../../models/Place')

const getAllUser = async(req, res)=>{
      try {
          const users = await User.find({})
        // console.log(users,"hhhhhhhhhh");
          return res.status(500).json(users)
      } catch (error) {
          return res.status(500).json(error)
      }
  }


  const handleBlock = async (req, res) => {
        try {
          const user = await User.findById(req.params.id);
          user.isBlocked = !user.isBlocked; // Toggle the isBlocked status
          await user.save(); // Save the updated user
          return res.status(200).json(user.isBlocked);
        } catch (error) {
          return res.status(500).json(error);
        }
      };



  const getUserVerification= async(req,res)=>{
   try {
   const driver = await Driver.find({Verified:false}).populate("user")
   return res.status(200).json(driver)
   } catch (error) {
  return res.status(500).json(error);
    }
      }


      const handleAccept = async (req, res) => {
        try {
          console.log("hello rashi");
          const driver = await Driver.findById(req.params.id);
      
          if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
          }
      
          driver.Verified = true;
          await driver.save(); // Save the updated driver document
          console.log(driver, "acccct");
      
          return res.status(200).json({ message: "Driver verified successfully" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      };
      

      const handleReject = async (req, res) => {
        try {
          const driver = await Driver.deleteOne({ _id: req.params.id });
      
          if (driver.deletedCount === 0) {
            return res.status(404).json({ message: "Driver not found" });
          }
      
          console.log(driver, "deleted");
      
          return res.status(200).json({ message: "Driver deleted successfully" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      };
      




      const getTotRides=async(req,res)=>{
        console.log('====================================');
        console.log("hgdygd");
        console.log('====================================');
        const confirmedConnectionsByMonth = await Connection.aggregate([
          {
            $match: {
              rideComformed: true,
            },
          },
          {
            $lookup: {
              from: 'drivers',
              localField: 'rideInfo',
              foreignField: '_id',
              as: 'rideDetails',
            },
          },
          {
            $unwind: '$rideDetails',
          },
          {
            $addFields: {
              rideDate: { $toDate: '$rideDetails.date' },
            },
          },
          {
            $project: {
              month: { $month: '$rideDate' },
            },
          },
          {
            $group: {
              _id: '$month',
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);
        
    console.log('====================================');
    console.log(confirmedConnectionsByMonth);
    console.log('====================================');
    return res.status(200).json(confirmedConnectionsByMonth)
      }
      
      const addplace = async (req, res) => {
        try {
          const { place } = req.body; // Extract the 'place' field from the request body
      
          // Create a new Place document
          const newPlace = new Place({
            place: place, // 'place' is a string, no need to wrap it in an array
          });
      
          // Save the new place document to the database
          await newPlace.save();
      
          res.status(200).json({ message: 'Place added successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };

module.exports = {getAllUser,handleBlock,getUserVerification,handleAccept,handleReject,getTotRides,addplace}
