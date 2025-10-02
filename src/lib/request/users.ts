import { baseURL } from "@/routes";
import axios from "axios";


export async function userList(){
  const eso = await axios.get(`${baseURL}/api/users`).then(res=>{return res.data})
  return eso.data
}