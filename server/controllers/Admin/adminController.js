const adminController = require("express").Router()
const User = require("../../models/User")
const Driver =require("../../models/Driver")
const Connection=require('../../models/Connection')

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
         // console.log("heloooooooooo@@@@@@@@@@@@@@");
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


      const handleAccept =async(req,res)=>{
        console.log("hello rashi");
        const driver = await Driver.findById(req.params.id);
        console.log(driver,"accccceeeeppppttttt");
        driver.Verified = true;
          await driver.save(); // Save the updated driver document
          console.log(driver,"acccct");
      }

      const handleReject =async(req,res)=>{
        // const driver = await Driver.findById(req.params.id);
        
        const driver = await Driver.deleteOne({_id:req.params.id})
        console.log(driver,"delted");

      }




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
        //res.json(confirmedConnectionsByMonth);
       // return confirmedConnectionsByMonth;
      
      }

module.exports = {getAllUser,handleBlock,getUserVerification,handleAccept,handleReject,getTotRides}
