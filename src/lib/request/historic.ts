import { baseURL } from "@/routes";
import axios from "axios";

export async function getHistoric (id: number) {
  axios.get(`${baseURL}/api/historic/${id}`)
  .then((res)=>{
    return res.data
  })
}