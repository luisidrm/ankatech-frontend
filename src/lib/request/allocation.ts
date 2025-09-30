import { baseURL } from "@/routes"
import type { AllocationFormData } from "../../schemas/allocation"
import axios from "axios"

export async function getAllocations(id:number) {
  await axios.get(`${baseURL}/api/allocations`,{
    params : {id:id}
  }).then((res)=>{
    return res.data
  })
}

export async function createAllocation(data: AllocationFormData) {
    await axios.post(`${baseURL}/api/allocations`,{
      data
    }).then((res)=>{
    return res.data
  })
}

export async function updateAllocation(id:number, value:number){
  await axios.put(`${baseURL}/api/allocations`,{
    id,
    value
  }).then(res=>{
    return res.data
  })
}