import { baseURL } from "@/routes";
import { Simulation } from "@/types/simulation";
import axios from "axios";

export const fetchSimulations = async (id:number): Promise<Simulation[]> => {
  return await axios.get(`${baseURL}/api/simulation`,{
    params: { id }
  })
    .then(response => {
      return response.data;
    })
}

export const editSimulation = async (simulation: Simulation) => {
  await axios.put(`${baseURL}/api/simulation/${simulation.id}`, simulation)
    .then(response => {
      return response.data;
    })
}
export const deleteSimulation = async (id: string) => {
  await axios.delete(`${baseURL}/api/simulation/${id}`)
    .then(response => {
      return response.data;
    })
}
export const newVersion = async (id:number) => {
  await axios.post(`${baseURL}/api/simulation`, { id })
    .then(response => {
      return response.data;
    })
}