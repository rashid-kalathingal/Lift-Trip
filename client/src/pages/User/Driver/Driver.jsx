import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/User/navbar/Navbar'
import Slogon from '../../../components/User/slogon/Slogon'
import Date from '../../../components/User/Driver/dateNlocation/Dates'
//import { request } from '../../../utils/fetchApi';
import { userInstance,setAccessToken } from '../../../utils/axiosApi'
import { logout } from '../../../redux/authSlice';
//import Vehicle from '../../../components/User/Driver/vehicle/Vehicle'
import DriverUser from '../../../components/User/Driver/driver/Driver'
import VehicleData from '../../../components/User/Driver/vehicle/Showvehicle'
import Instruction from '../../../components/User/Driver/instructions/Instruction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import 'animate.css';
import Footer from '../../../components/User/footer/footer'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const Driver = () => {
  const { token, user } = useSelector((state) => state.auth)
  const [pickUpOption, setPickUpOption] = useState('')
  const [dropOffOption, setDropOffOption] = useState('')
  const [date, setDate] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [numberOfSeats, setNumberOfSeats] = useState('')
  const [availableSpace, setAvailableSpace] = useState('')
  const [vehicleImage, setVehicleImage] = useState('')
  const [vehicleRC, setVehicleRC] = useState('')
  const [VehicleInsurance, setVehicleInsurance] = useState('')
  const [instructions, setInstructions] = useState('')
  const [instr, setInstr] = useState('')
  const [textinstruction, setTextinstruction] = useState('')
  const [radioPaymentArray,setRadioPaymentArray] = useState('')
  const [selectedRadio, setSelectedRadio] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])
  

  useEffect(() => {
    // Concatenate new instruction with existing instructions
    const updatedInstructions = instructions.concat(textinstruction);

    // Check if the new instruction is not empty before updating instr state
    if (textinstruction !== '' || textinstruction == '' ) {
      setInstr(updatedInstructions);
    }

    // Create an array to store selectedRadio and paymentAmount
    const radioPaymentArr = [];

    // Check if selectedRadio is "Need Payment" and paymentAmount is not empty
    if (selectedRadio === 'Need Payment' && paymentAmount !== '') {
      radioPaymentArr.push(selectedRadio, paymentAmount);
    } else  {
      radioPaymentArr.push(selectedRadio);
    }

    setRadioPaymentArray(radioPaymentArr);

  
  }, [instructions, textinstruction, selectedRadio, paymentAmount]);


  // const navigate =useNavigate()
  const dispatch=useDispatch()
  // Callback function to receive selected data as an object
const handleDateSelection = (selectedData) => {
  // You can access selectedData.pickUpOption, selectedData.dropOffOption, and selectedData.date here
  setPickUpOption(selectedData.pickUpOption[0].value)
  setDropOffOption(selectedData.dropOffOption[0].value)
  setDate(selectedData.date)
  toast.success('Date Selected Successfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  
};


  // Callback function to receive the selected vehicle data
  const handleSelectedVehicle = (vehicleData) => {
   // setSelectedVehicleData(vehicleData);

    // You can access individual properties like vehicleData.VehicleModel, vehicleData.VehicleNumber, etc.
    
    setVehicleModel(vehicleData.VehicleModel); 
    setVehicleNumber(vehicleData.VehicleNumber); 
    setNumberOfSeats(vehicleData.NumberOfSeats); 
    setAvailableSpace(vehicleData.AvailableSpace); 
    setVehicleImage(vehicleData.VehicleImage[0]); 
    setVehicleRC(vehicleData.VehicleRC[0]); 
    setVehicleInsurance(vehicleData.VehicleInsurance[0]); 
    toast.success('Vehicle Selected Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };
  

    
    const handleInstructionDataChange = (data) => {
      // Handle the data received from the Instruction component
    //console.log('Received Data:', data);
     // setFormData(data); // You can set the data in state or perform any other actions here
     setInstructions(data.instructions);
     setTextinstruction(data.textinstruction);
     setSelectedRadio(data.selectedRadio);
     setPaymentAmount(data.paymentAmount);
     if(data.selectedRadio){
      toast.success('Instructions Selected Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
     }
     
    };
   

const handleRegisterRide = async (e)=>{
      e.preventDefault();

      if(!pickUpOption|| !dropOffOption || !date || !instructions|| !vehicleModel || !vehicleNumber || !numberOfSeats || !availableSpace || !vehicleImage || !vehicleRC || !VehicleInsurance || !instr || !radioPaymentArray  ){
        return toast.error('Fill all datas....')
        }
      if(!user.displayPic[0] ){
        return toast.error('Add your Dp')
        }
    //   const options = {
    //     headers: {
    //   'Authorization': `Bearer ${token}`
    // } 
       
    //   };
     const body= {
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
        instructions: instr,
        radioPaymentArray,
      }

    
try {
  setAccessToken(token)
  const response = await userInstance.post('/ride',body)

  // Handle the response from the server as needed
  console.log('Vehicle Registration Response:', response);
  Swal.fire({
    title: 'You Successfully Created',
    icon: 'success',
    // imageUrl: 'https://media.giphy.com/media/l3q2ObAk4qx9jmuAM/giphy.gif',
    // imageAlt: 'Success Image', // You can specify an alt text for the image
  //   backdrop: `
  //   rgba(0, 0, 123, 0.4)
  //   url("https://media.giphy.com/media/l3q2ObAk4qx9jmuAM/giphy.gif")
  //   left top
  //   no-repeat
   
  // `,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });
  setTimeout(() => {
    window.location.reload();
  }, 3000);

  window.scrollTo({ top: 0, behavior: 'smooth' });

} catch (error) {
  // Handle error
  toast.error(error.response.data)
  dispatch(logout());
  // navigate("/login")
  console.error('Error registering vehicle:', error);
}
    }
   

  return (
    <div>
         <Navbar />
         <div className="mb-6"> <Slogon /></div>
         <div className="mb-6"> <Date onDateSelection={handleDateSelection} />
         <ToastContainer /></div>
         <div className="mb-6"><VehicleData onVehicleSelect={handleSelectedVehicle}/></div>
         <div className="mb-6"><DriverUser header={'Driver Details'} /></div>
         <div className="mb-6"><Instruction onInstructionDataChange={handleInstructionDataChange}/></div>
         <div className="flex justify-center items-center" >
         <button className="p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" onClick={handleRegisterRide}>
  <div className="flex justify-center items-center">
    <a href="#_" className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
      <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
      <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
      <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
      <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
      <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
      <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Let's Go..</span>
    </a>
  </div>
</button>
         </div>
        




      <Footer/>
    </div>
  )
}

export default Driver
