import { z } from "zod"

export const financialSchema = z.object({
  type: z.literal("financial"),
  name: z.string().min(1, "Required"),
  value: z.number().min(1, "Value must be greater than 0"),
  date: z.string().min(1, "Required"), // ISO date string
})

export const realEstateSchema = z.object({
  type: z.literal("real-estate"),
  name: z.string().min(1, "Required"),
  value: z.number().min(1, "Value must be greater than 0"),
  withFinancing: z.boolean().default(false),
  startDate: z.string().optional(),
  installments: z.number().optional(),
  interestRate: z.number().optional(),
  downPayment: z.number().optional(),
}).refine(
  (data) =>
    !data.withFinancing ||
    (data.startDate && data.installments && data.interestRate !== undefined && data.downPayment !== undefined),
  {
    message: "All financing fields are required when financing is included",
    path: ["withFinancing"],
  }
)

export const allocationSchema = z.discriminatedUnion("type", [
  financialSchema,
  realEstateSchema,
])

export type AllocationFormData = z.infer<typeof allocationSchema>
