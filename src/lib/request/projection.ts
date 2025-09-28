import axios from "axios";

export const projectionGet = async(id: number, status: string) => {
  await axios.get(`http://localhost:3000/projection/${id}?status=${status}`)
    .then(response => {
      return response.data;
    })
}