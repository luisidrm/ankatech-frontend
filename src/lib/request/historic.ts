import { baseURL } from "@/routes";
import axios from "axios";

export async function getHistoric (id: number) {
  const eso = await axios.get(`${baseURL}/api/historic/${id}`)
  .then((res)=>{
    return res.data
  })
  return eso.data
}