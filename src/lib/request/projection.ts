import { baseURL } from "@/routes";
import axios from "axios";

export const projectionGet = async(id: number, status: string):[] => {
  await axios.get(`${baseURL}/api/projection/${id}?status=${status}`)
    .then(response => {
      return response.data;
    })
}