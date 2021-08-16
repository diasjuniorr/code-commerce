import axios from "axios";

//TODO add env variables
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STORE_API_URL,
});

export default http;
