import { baseURL } from "@/routes";
import type{ UpdateSimulationBody } from "@/schemas/simulation.schema";
import axios from "axios";

export const editSimulation = async (simulation: UpdateSimulationBody) => {
  const eso = await axios.put(`${baseURL}/api/simulation/${simulation.id}`, simulation)
    .then(response => {
      return response.data;
    })
    return eso.data
}
export const deleteSimulation = async (id: number) => {
  const eso = await axios.delete(`${baseURL}/api/simulation/${id}`)
    .then(response => {
      return response.data;
    })
    return eso.data
}
export const newVersion = async (id:number) => {
  const eso = await axios.post(`${baseURL}/api/simulation`, { id })
    .then(response => {
      return response.data;
    })
    return eso.data
}