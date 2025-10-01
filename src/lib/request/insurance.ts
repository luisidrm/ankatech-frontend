import { baseURL } from "@/routes"
import type{ CreateInsuranceBody, UpdateInsuranceBody } from "@/schemas/insurance.schema"
import axios from "axios"

export async function getInsurance(id:number){
  await axios.get(`${baseURL}/api/insurance/${id}`)
  .then(res=>{
    return res.data
  })
}

export async function createInsurance(id:number, data:CreateInsuranceBody) {
  await axios.post(`${baseURL}/api/${id}/insurance`,{
    data
  }).then(res=>{
    return res.data
  })
}

export async function updateInsurance(data:UpdateInsuranceBody) {
  await axios.post(`${baseURL}/api/insurance`,{
    data
  }).then(res=>{
    return res.data
  })
}
export async function deleteInsurance(id:number) {
  await axios.delete(`${baseURL}/api/insurance/${id}`).then(res=> {return res.data} )

}