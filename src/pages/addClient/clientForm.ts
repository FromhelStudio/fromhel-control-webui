import { z } from 'zod'

export const addClientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.optional(z.string().min(1, 'E-mail é obrigatório')),
})

export type TAddClientSchema = z.infer<typeof addClientSchema>