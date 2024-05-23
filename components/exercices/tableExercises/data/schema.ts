import {z} from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const exercisesSchema = z.object({
  id: z.number(),
  difficulty: z.string(),
  title: z.string(),
  theme: z.string(),
  lastScore: z.number(),
  nbQuestions: z.number(),
})

export type Exercises = z.infer<typeof exercisesSchema>
