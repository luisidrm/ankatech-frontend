// schemas/transaction.schema.ts
import { z } from 'zod'

export const transactionTypeSchema = z.enum(['INCOME', 'EXPENSE'])
export type TransactionType = z.infer<typeof transactionTypeSchema>
export const frequencySchema = z.enum(['ONE_TIME', 'MONTHLY', 'ANNUAL'])
export type Frequency = z.infer<typeof frequencySchema>

export const createTransactionBody = z.object({
    id:z.number().optional(),
    type: transactionTypeSchema,
    value: z.number().positive("Value must be positive").multipleOf(0.01),
    frequency: frequencySchema,
    startDate: z.string(),
    endDate: z.string().optional()
})

export const updateTransactionBody = createTransactionBody.partial()

export type CreateTransaction = z.infer<typeof createTransactionBody>

export type UpdateTransaction = z.infer<typeof updateTransactionBody>