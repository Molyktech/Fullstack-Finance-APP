import {z} from 'zod';

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters long");


export const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: emailSchema,
    password: passwordSchema,
    address1: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),   
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    dateOfBirth: z.preprocess(
  (val) => (typeof val === "string" || val instanceof Date ? new Date(val) : val),
  z.date()
),
    ssn: z.string().min(1, "SSN is required"),

});

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    userAgent: z.string().optional(),
});