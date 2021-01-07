import axios from 'axios'

const API =  axios.create({
    baseURL:'https://cnlsuivie.herokuapp.com'
})

API.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  
  export default API;