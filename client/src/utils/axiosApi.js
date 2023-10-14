import axios from 'axios'


let accessToken;
export function setAccessToken(token){
    accessToken=token
}



const userInstance = axios.create({
    baseURL : "http://localhost:5000/auth",
    headers:{
        Accept:"application/json"
    }
})
const adminInstance = axios.create({
    baseURL : "http://localhost:5000/adminAuth",
    headers:{
        Accept:"application/json"
    }
})

userInstance.interceptors.request.use(function (config) {
    if (accessToken !== "") {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

//   adminInstance.interceptors.request.use(function (config) {
//     if (accessToken !== "") {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   });

export {userInstance , adminInstance}