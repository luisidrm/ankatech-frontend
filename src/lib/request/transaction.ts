import { baseURL } from "@/routes";
import type { CreateTransaction, UpdateTransaction } from "@/schemas/transaction.schema";
import axios from "axios";

export async function getTransaction(id: number) {
  await axios.get(`${baseURL}/api/transactions/`, {
    params: {
      id: id
    }
  }).then(res => {
    return res.data
  })
}

export async function createTransaction(id:number, data: CreateTransaction) {
  if (data.frequency === "ONE_TIME") {
    await axios.post(`${baseURL}/api/transactions`, {
      simulationdId:id,
      data
    }).then(res => {
      return res.data
    })
  } else {
    await axios.post(`${baseURL}/api/periodictransactions`, {
      simulationdId:id,
      data
    }).then(res => {
      return res.data
    })
  }
}

export async function updateTransaction(data: UpdateTransaction) {
  await axios.put(`${baseURL}/api/transactions/${data.id}`, {
    data
  }).then(res => {
    return res.data
  })
}

export async function deleteTransaction(id: number) {
  await axios.delete(`${baseURL}/api/transactions/${id}`)
    .then(res => {
      return res.data
    })
}