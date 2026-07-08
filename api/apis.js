import axios from "axios";

const apis = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})

export default apis;
