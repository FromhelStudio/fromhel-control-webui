import { z } from 'zod'

export const removeClientSchema = z.object({
  fhsId: z.optional(z.string().min(1, 'Id é obrigatório')),
})

export type TRemoveClientSchema = z.infer<typeof removeClientSchema>