"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {type UpdateTransaction, updateTransactionBody } from "@/schemas/transaction.schema"
import {  updateTransaction } from "@/lib/request/transaction"


type Props={
  updateData: UpdateTransaction,
  fillUpdateData: (arg0:UpdateTransaction)=>void
}

export default function CreateTransactionForm({updateData, fillUpdateData}:Props) {
  const queryClient = useQueryClient()

  console.log(updateData);
  
  
  const mutation = useMutation({
    mutationFn: (data: UpdateTransaction) => updateTransaction(data),
    onSuccess: () => {
      // refetch transactions after success
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: (error: unknown) => {
      console.error("❌ Error saving allocation:", error)
    },
  })

  const form = useForm<UpdateTransaction>({
    resolver: zodResolver(updateTransactionBody),
    defaultValues: {
      id:updateData.id,
      type: updateData.type,
      value: updateData.value,
      frequency: updateData.frequency,
      startDate: updateData.startDate,
      endDate: updateData.endDate,

    },
  })

  const onSubmit = (values: UpdateTransaction) => {
    mutation.mutate(values)
  }


  return (
    <div className="fixed top-0 left-0 z-40 place-items-center  p-8 backdrop-blur-lg w-[100%] h-[100vh] overflow-hidden">

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg backdrop-blur-xl rounded-lg w-[70%] text-black p-10 bg-[#1B1B1B]"
      >
        {/* Allocation Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Tipo</FormLabel>
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

                <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Tipo</FormLabel>
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONE_TIME">Unique</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="ANNUAL">Annual</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Valor</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="px-4 flex justify-center w-full">
        <Button type="submit" variant={"secondary"} className="text-black w-[40%] mr-6">Salvar</Button>
        <Button type="button" variant={"destructive"} onClick={()=>fillUpdateData({})} className="text-white">Cancelar</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
