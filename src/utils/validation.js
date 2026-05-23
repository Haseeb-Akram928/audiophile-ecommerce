import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please provide a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});

export const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address."),
  phone: z.string().min(10, "Provide a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  zip: z.string().min(5, "ZIP Code must be 5-10 characters").max(10),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["e-money", "cash"]),
  eMoneyNumber: z.string().optional(),
  eMoneyPin: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "e-money") {
    if (!data.eMoneyNumber || data.eMoneyNumber.length < 9) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "e-Money number must be 9 digits",
        path: ["eMoneyNumber"],
      });
    }
    if (!data.eMoneyPin || data.eMoneyPin.length < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "PIN must be 4 digits",
        path: ["eMoneyPin"],
      });
    }
  }
});

