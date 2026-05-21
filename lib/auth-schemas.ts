import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/\d/, "Include a number");

export const transactionPinSchema = z
  .string()
  .length(4, "PIN must be exactly 4 digits")
  .regex(/^\d{4}$/, "PIN must contain only numbers");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: emailSchema,
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^\+[1-9]\d{7,14}$/,
        "Enter a valid phone number with country code"
      ),
    country: z.string().min(1, "Please select your country"),
    transactionPin: transactionPinSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((v) => v === true, {
      message: "You must accept the terms to continue",
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/, "Code must be 6 digits"),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const twoFactorCodeSchema = z.object({
  code: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/, "Invalid code"),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type OtpForm = z.infer<typeof otpSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
