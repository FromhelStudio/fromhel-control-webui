import { z } from 'zod'

export const syncOutSchema = z.object({
  email: z.optional(z.string().min(1, 'E-mail é obrigatório')),
  password: z.optional(z.string().min(1, 'Senha é obrigatório')),
})

export type TSyncOutSchema = z.infer<typeof syncOutSchema>