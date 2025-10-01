import { number, z } from 'zod'

export const insuranceTypeSchema = z.enum(['LIFE', 'DISABILITY'])
export type InsuranceType = z.infer<typeof insuranceTypeSchema>

export const createInsuranceBody = z.object({
    id:number().optional(),
    name: z.string(),
    type: insuranceTypeSchema,
    premium: z.number().positive("Premium must be positive").multipleOf(0.01),
    insuredValue: z.number().positive("Insured value must be positive").multipleOf(0.01),
    startDate: z.iso.datetime(),
    endDate: z.iso.datetime().optional()
})

export const updateInsuranceBody = createInsuranceBody.partial()

export type CreateInsuranceBody = z.infer<typeof createInsuranceBody>

export type UpdateInsuranceBody = z.infer<typeof updateInsuranceBody>

