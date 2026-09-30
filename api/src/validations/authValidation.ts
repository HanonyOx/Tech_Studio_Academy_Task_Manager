import { z }from "zod"

export const registerSchema = z.object({
    name: z.string().trim().min(1),
    email: z.email().toLowerCase(),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/)
})

export const loginSchema = z.object({
    email: z.email().toLowerCase(),
    password: z.string().min(8)
})

