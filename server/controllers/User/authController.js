const authController = require('express').Router()
const User = require('../../models/User')
const Wallet  =require('../../models/Wallet')
const verifyToken = require('../../middlewares/userVerifyToken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    try {
        console.log(req.body,"////////mmmmmmmmm");
        const isExisting = await User.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile }
            ]
        });

        if (isExisting) {
            return res.status(400).json({ error: "An account with this email or mobile number already exists. Please use a different email and mobile number." });
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ ...req.body, password: hashPassword , displayPic: []});
        const { password,displayPic, backgroundImg , ...others } = newUser._doc;
        const token = jwt.sign({ id: newUser._id , role:'user' }, process.env.JWT_SECRET, {expiresIn: '5h' });


        const wallet = new Wallet({
          UserId:newUser._id,
          Amount: 0, 
          history: [], 
        });
        await wallet.save();

        return res.status(201).json({ user: others, token });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const googleAuth = async (req, res) => {
  console.log(req.body, "/////////////////////////");
  const Email = req.body.email;
  const Username = req.body.name;
  const DP = req.body.picture;

  try {
    const existingUser = await User.findOne({ email: Email });

    if (existingUser) {
      // User already exists, generate a JWT token and send it back as a response
      const { password, ...userWithoutPassword } = existingUser._doc;
      const token = jwt.sign(
        { id: existingUser._id, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
      );
      return res.status(200).json({ user: userWithoutPassword, token });
    } else {
      // User doesn't exist, register the user with the provided data
      const newUser = await User.create({
        email: Email,
        username: Username,
        password: '', // Since no password is provided from Google OAuth
        displayPic: [DP], // Store the profile picture URL
      });

      // Generate a JWT token for the newly registered user
      const { password, ...userWithoutPassword } = newUser._doc;
      const token = jwt.sign(
        { id: newUser._id, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
      );

      return res.status(201).json({ user: userWithoutPassword, token });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};



const login = async(req,res)=>{
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user){
                throw new Error("Invalid credentials")
            }
            if (user.isBlocked) {
               
                return res.status(403).json({ message: "Your account is blocked. Please contact the administrator." });
              }
            const comparePass = await bcrypt.compare(req.body.password, user.password)
            if(!comparePass){
                throw new Error("Invalid credentials")
            }
    
            const {password, ...others} = user._doc
            const token = jwt.sign({id:user.id, role:'user' },process.env.JWT_SECRET,{expiresIn:'5h'})
            return res.status(200).json({user:others, token})
        } catch (error) {
            return res.status(500).json(error)
        }
    }

 const checkUser = async(req,res)=>{
  try {
    console.log("./..");
    const userId = req.params.id;
    const usersz = await User.find({ _id: userId })
   // console.log(usersz);
    const userB =usersz[0].isBlocked
    console.log(userB,"////>>");
    return res.status(200).json(userB)
  } catch (error) {
    console.log(error);
  }
 }   


const logout =async (req, res) => {
        try {
          // Extract the token from the request header or body
          const token = req.headers.authorization?.split(' ')[1] || req.body.token;
          
          // Add the token to the blacklist
          tokenBlacklist.add(token);
          
          // Perform any additional logout actions (e.g., clear session data)
      
          return res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
          return res.status(500).json(error);
        }
      }
module.exports = { register, login, logout,checkUser,googleAuth };