import axios from "axios";

const API="http://localhost:3000";

export const getProducts=async()=>{
const res=await axios.get(`${API}/products`);
return res.data;
};