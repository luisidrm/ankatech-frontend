import { z } from 'zod'

export const createSimulationBody = z.object({
    name: z.string().min(1, "Name is required"),
    start_date: z.iso.datetime().optional().default(new Date().toISOString()),
})

export const updateSimulationBody = createSimulationBody.partial()


export type CreateSimulationBody = z.infer<typeof createSimulationBody>

export type UpdateSimulationBody = z.infer<typeof updateSimulationBody>