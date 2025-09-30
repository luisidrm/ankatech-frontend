import { z } from "zod"

export const typeSchema = z.enum(["financial","real-estate"])
export type TypeSchema = z.infer<typeof typeSchema>

export const allocationSchema = z.object({
  id: z.int().optional(),
  type: typeSchema,
  name: z.string().min(1, "Required"),
  value: z.number().min(1, "Value must be greater than 0"),
  startDate: z.string(),
  withFinancing: z.boolean(),
  installments: z.number().optional(),
  interestRate: z.number().optional(),
  downPayment: z.number().optional(),
})
export const updateAllocationSchema = allocationSchema.partial()

export type CreateAllocationFormData = z.infer<typeof allocationSchema>
export type UpdateAllocationFormData = z.infer<typeof updateAllocationSchema>
