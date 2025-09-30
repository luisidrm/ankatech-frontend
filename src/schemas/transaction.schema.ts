// schemas/transaction.schema.ts
import { z } from 'zod'

export const transactionTypeSchema = z.enum(['INCOME', 'EXPENSE'])
export type TransactionType = z.infer<typeof transactionTypeSchema>
export const frequencySchema = z.enum(['ONE_TIME', 'MONTHLY', 'ANNUAL'])
export type Frequency = z.infer<typeof frequencySchema>

export const createTransactionBody = z.object({
    type: transactionTypeSchema,
    value: z.number().positive("Value must be positive").multipleOf(0.01),
    frequency: frequencySchema,
    start_date: z.iso.datetime(),
    end_date: z.iso.datetime().optional()
})

export const updateTransactionBody = createTransactionBody.partial()

export type CreateTransactionBody = z.infer<typeof createTransactionBody>

export type UpdateTransactionBody = z.infer<typeof updateTransactionBody>