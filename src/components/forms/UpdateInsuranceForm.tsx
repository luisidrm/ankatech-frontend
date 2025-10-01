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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateInsurance } from "@/lib/request/insurance"
import { updateInsuranceBody, type UpdateInsuranceBody} from "@/schemas/insurance.schema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


type Props = {
  selectedId: number
  openIn: boolean
  updateInsuranceData: UpdateInsuranceBody
  setOpenIn: (arg0: boolean) => void
}

export default function UpdateInsuranceForm({ openIn, updateInsuranceData, setOpenIn }: Props) {
  const queryClient = useQueryClient()



  const mutation = useMutation({
    mutationFn: (data: UpdateInsuranceBody) => updateInsurance(data),
    onSuccess: () => {
      // refetch transactions after success
      queryClient.invalidateQueries({ queryKey: ["insurance"] })
    },
    onError: (error: unknown) => {
      console.error("❌ Error saving allocation:", error)
    },
  })

  const form = useForm<UpdateInsuranceBody>({
    resolver: zodResolver(updateInsuranceBody),
    defaultValues: {
      type: updateInsuranceData.type,
      name: updateInsuranceData.name,
      startDate: updateInsuranceData.startDate,
      endDate: updateInsuranceData.endDate,
      insuredValue: updateInsuranceData.insuredValue,
    },
  })

  const onSubmit = (values: UpdateInsuranceBody) => {
    mutation.mutate(values)
  }


  return (
    <div className="fixed top-0 left-0 z-40 place-items-center  p-8 backdrop-blur-lg w-[100%] h-[100vh] overflow-hidden">

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
                <FormLabel className="text-white">Type</FormLabel>
                <Select
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LIFE">LIFE</SelectItem>
                    <SelectItem value="DISABILITY">DISABILITY</SelectItem>
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
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name of Insurance" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="insuredValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Insured Value</FormLabel>
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
            <Button type="button" variant={"destructive"} onClick={() => setOpenIn(!openIn)} className="text-white">Cancelar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
