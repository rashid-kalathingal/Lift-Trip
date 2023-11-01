import axios from 'axios'
import { BASE_URL } from './constant';


let accessToken;
export function setAccessToken(token){
    accessToken=token
}



const userInstance = axios.create({
    baseURL : `${BASE_URL}/auth`,
    headers:{
        Accept:"application/json"
    }
})
const adminInstance = axios.create({
    baseURL :`${BASE_URL}/adminAuth` ,
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