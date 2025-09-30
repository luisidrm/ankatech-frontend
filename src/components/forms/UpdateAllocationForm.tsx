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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { updateAllocation } from "@/lib/request/allocation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Props = {
  updateData: UpdateAllocationFormData
  openUpdate: boolean
  fillUpdateData: (arg0: UpdateAllocationFormData)=>void

}


export default function UpdateAllocationForm({ fillUpdateData , updateData}:Props) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: UpdateAllocationFormData) => updateAllocation(data),
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
      id: updateData.id,
      type: updateData.type,
      name: updateData.name,
      value: updateData.value,
      startDate: updateData.startDate,
      withFinancing: updateData.withFinancing,
      installments:updateData.installments,
      interestRate: updateData.interestRate,
      downPayment: updateData.downPayment

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
        className="space-y-6 max-w-lg backdrop-blur-xl rounded-lg w-[70%] text-black p-10 bg-[#1B1B1B]"
      >
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
                  <SelectItem value="financial">Financeiro</SelectItem>
                  <SelectItem value="real-estate">Imobilizado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {updateData.type === "financial" && (
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Data</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {updateData.type === "real-estate" && (
          <>
            <FormField
              control={form.control}
              name="withFinancing"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 place-items-center ">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 bg-white"
                  />
                  <FormLabel className="text-white ">Financiado?</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("withFinancing") && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Data inicial</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="installments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Número de parcelas</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Taxa de juros (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="downPayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Valor entrada</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </>
        )}
        <div className="px-4 flex justify-center w-full">
        <Button type="submit" variant={"secondary"} className="text-black w-[40%] mr-6">Salvar</Button>
        <Button type="button" variant={"destructive"} onClick={()=>fillUpdateData({})} className="text-white">Cancelar</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
