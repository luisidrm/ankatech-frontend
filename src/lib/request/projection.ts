import { baseURL } from "@/routes";
import axios from "axios";

type Projection={
  id:number,
  year: number,
  originalPlan: number,
  currentSituation: number
}

export const projectionGet = async(id: number, status: string):Promise<[Projection]> => {
  const eso = await axios.get(`${baseURL}/api/projection/${id}?status=${status}`)
    .then(response => {
      return response.data;
    })
  return eso.data  
    
}