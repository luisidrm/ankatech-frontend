import { baseURL } from "@/routes";
import { Simulation } from "@/types/simulation";
import axios from "axios";

export const fetchSimulations = async (): Promise<Simulation[]> => {
  return await axios.get(`${baseURL}/api/simulation`)
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