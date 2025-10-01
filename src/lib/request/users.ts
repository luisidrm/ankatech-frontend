import { baseURL } from "@/routes";
import axios from "axios";


export async function userList(){
  await axios.get(`${baseURL}/api/users`).then(res=>{return res.data})
}