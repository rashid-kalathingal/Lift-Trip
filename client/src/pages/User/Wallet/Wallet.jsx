import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/User/navbar/Navbar'
import { useSelector } from 'react-redux';
import { userInstance,setAccessToken } from '../../../utils/axiosApi';




const Wallet = () => {
    const { user,token } = useSelector((state) => state.auth);
    const[wallet,Setwallet]= useState('')



    useEffect(() => {
        const fetchWallet = async () => {
          try {
           const Id=user._id
            // const options = {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            // };
            setAccessToken(token)
            const response = await userInstance.get(`/getWallet/${Id}`);
        console.log(response.data,"wallet");
          Setwallet(response.data)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchWallet();
      }, []);


  return (
    <div>
        <Navbar/>
    
        <div className="col-md-12 flex justify-center items-center h-screen" style={{ backgroundImage: "url('https://imgs.search.brave.com/txiL67BP7MiS7lagBlNUkXdanygKc5l2aj3E90XQ6vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jMC53/YWxscGFwZXJmbGFy/ZS5jb20vcHJldmll/dy84ODAvMTAwLzU3/L2xlYXRoZXItd2Fs/bGV0LWJ1c2luZXNz/LWNhcmRzLmpwZw')" }}>
  <div className="relative bg-cover bg-center bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-lg shadow-lg w-96 bg-slate-300/70 ">
    {/* <img src={`url(http://localhost:5000/images/${wallet.UserId?.displayPic[0]})`} className="profile-image absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-white" alt="Profile Image" id="profileImage" /> */}

    <div className="card-body text-gray-900" style={{ letterSpacing: '2px' }}>
      <h3 className="text-2xl font-semibold mb-4">Wallet Amount</h3>
      {/* <h6 className="text-lg">Name: {wallet.UserId?.username}</h6> */}
      <h6 className="text-lg">Wallet Amount: {wallet.Amount || 0} </h6>
    </div>
    
  </div>
</div>





    </div>
  )
}

export default Wallet
