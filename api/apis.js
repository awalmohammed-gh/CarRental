import axios from "axios";

const apis = axios.create({
    baseURL:"http://localhost:4000"
})

export default apis;
