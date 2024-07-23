import { z } from 'zod'

export const syncOutSchema = z.object({
  name: z.optional(z.string().min(1, 'Nome é obrigatório')),
  email: z.optional(z.string().min(1, 'E-mail é obrigatório')),
  password: z.optional(z.string().min(1, 'Senha é obrigatório')),
  phone: z.optional(z.string().min(1, 'Telefone é obrigatório')),
  role: z.optional(z.string().min(1, 'Cargo é obrigatório'))
})

export type TSyncOutSchema = z.infer<typeof syncOutSchema>