import { z } from 'zod'

export const createRealStateBody = z.object({
    allocationId: z.number().int().positive("Allocation ID must be positive"),
    installations: z.number().int().positive("Number of installations must be positive"),
    interest: z.number().positive("Interest rate must be positive").multipleOf(0.01),
    down_payment: z.number().nonnegative("Down payment cannot be negative").multipleOf(0.01)
})

export const updateRealStateBody = createRealStateBody.partial()

export const updateRealStateParams = z.object({
    id: z.string().transform((val) => parseInt(val, 10))
})

export const deleteRealStateParams = z.object({
    id: z.string().transform((val) => parseInt(val, 10))
})

export const realStatesFromAllocationQuery = z.object({
    allocationId: z.string().transform((val) => parseInt(val, 10))
})

export type RealStatesFromAllocationQuery = z.infer<typeof realStatesFromAllocationQuery>

export type CreateRealStateBody = z.infer<typeof createRealStateBody>

export type UpdateRealStateBody = z.infer<typeof updateRealStateBody>
export type UpdateRealStateParams = z.infer<typeof updateRealStateParams>

export type DeleteRealStateParams = z.infer<typeof deleteRealStateParams>
