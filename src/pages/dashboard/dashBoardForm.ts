import { z } from 'zod'

export const dashBoardFilter = z.object({
  inputData: z.optional(z.string().min(1, 'Deve ter algum dado para filtrar'))
})

export type TDashBoardFilter = z.infer<typeof dashBoardFilter>