import { z } from 'zod'

export const createSimulationBody = z.object({
    id:z.number().optional(),
    name: z.string().min(1, "Name is required"),
    startDate: z.iso.datetime().optional().default(new Date().toISOString()),
    interestRate: z.number().optional()
})

export const updateSimulationBody = createSimulationBody.partial()


export type CreateSimulationBody = z.infer<typeof createSimulationBody>

export type UpdateSimulationBody = z.infer<typeof updateSimulationBody>