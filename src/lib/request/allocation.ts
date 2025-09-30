import { baseURL } from "@/routes"
import type { CreateAllocationFormData, UpdateAllocationFormData } from "../../schemas/allocation"
import axios from "axios"

export async function getAllocations(id:number) {
  await axios.get(`${baseURL}/api/allocations`,{
    params : {id:id}
  }).then((res)=>{
    return res.data
  })
}

export async function createAllocation(data: CreateAllocationFormData) {
    await axios.post(`${baseURL}/api/allocations`,{
      data
    }).then((res)=>{
    return res.data
  })
}

export async function editAllocation(id:number,name:string, value:number){
  await axios.put(`${baseURL}/api/allocations/${id}/duplicate`,{
    name,
    value
  }).then(res=>{
    return res.data
  })
}

export async function updateAllocation (data: UpdateAllocationFormData){
  await axios.put(`${baseURL}/api/allocations/${data.id}/duplicate`,{
    data
  }).then(res=>{
    return res.data
  })
}