"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type UpdateAllocationFormData, updateAllocationSchema } from "@/schemas/allocation"
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
import { editAllocation } from "@/lib/request/allocation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Props = {
  updateData: UpdateAllocationFormData
  duplicate: boolean
  fillDuplicate: (arg0: UpdateAllocationFormData)=>void

}

export default function DuplicateAllocationForm({ fillDuplicate , updateData}:Props) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: UpdateAllocationFormData) => editAllocation(updateData.id, data.name, data.value),
    onSuccess: () => {
      // refetch allocations after success
      queryClient.invalidateQueries({ queryKey: ["allocations"] })
    },
    onError: (error: unknown) => {
      console.error("❌ Error saving allocation:", error)
    },
  })

  const form = useForm<UpdateAllocationFormData>({
    resolver: zodResolver(updateAllocationSchema),
    defaultValues: {
      name: updateData.name,
      value: updateData.value,
    },
  })

  const onSubmit = (values: UpdateAllocationFormData) => {
    mutation.mutate(values)
  }


  return (
    <div className="absolute z-40 place-items-center  p-8 backdrop-blur-lg w-full h-[100vh]">

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg backdrop-blur-xl rounded-lg w-[70%] 
        text-black p-10 bg-[#1B1B1B]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nome</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nome da alocação" />
              </FormControl>
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

        <div className="px-4 flex justify-center w-full">
        <Button type="submit" variant={"secondary"} className="text-black w-[40%] mr-6">Salvar</Button>
        <Button type="button" variant={"destructive"} onClick={()=>fillDuplicate({})} className="text-white">Cancelar</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
