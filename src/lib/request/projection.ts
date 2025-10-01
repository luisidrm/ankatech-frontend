import { baseURL } from "@/routes";
import axios from "axios";

export const projectionGet = async(id: string, status: string) => {
  await axios.get(`${baseURL}/api/projection/${id}?status=${status}`)
    .then(response => {
      return response.data;
    })
}