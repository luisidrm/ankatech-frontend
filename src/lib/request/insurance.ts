import { baseURL } from "@/routes"
import type{ CreateInsuranceBody, UpdateInsuranceBody } from "@/schemas/insurance.schema"
import axios from "axios"

export async function getInsurance(id:number){
  const eso = await axios.get(`${baseURL}/api/insurance/`,{
    params:{
      simulationId:id
    }
  })
  .then(res=>{
    return res.data
  })
  return eso.data
}

export async function createInsurance(id:number, data:CreateInsuranceBody) {
  const eso = await axios.post(`${baseURL}/api/insurance`,{
    simulationId:id,
    data
  }).then(res=>{
    return res.data
  })
  return eso.data
}

export async function updateInsurance(data:UpdateInsuranceBody) {
  const eso = await axios.post(`${baseURL}/api/insurance`,{
    data
  }).then(res=>{
    return res.data
  })
  return eso.data
}
export async function deleteInsurance(id:number) {
  const eso = await axios.delete(`${baseURL}/api/insurance/${id}`).then(res=> {return res.data} )
  return eso.data

}