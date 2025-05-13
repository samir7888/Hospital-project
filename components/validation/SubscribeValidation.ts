import { z } from 'zod';

// Email validation schema
export const emailSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .max(100, 'Email must be less than 100 characters')
    .refine(
      (email) => {
        // Additional custom validation if needed
        // For example, checking for specific domains, etc.
        return true;
      },
      {
        message: 'This email provider is not supported',
      }
    ),
});

// Simple validation function that returns errors if any
export const validateEmail = (email:string) => {
  try {
    emailSchema.parse({ email });
    return { success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract the first error message
      const errorMessage = error.errors[0]?.message || 'Invalid email';
      return { success: false, error: errorMessage };
    }
    return { success: false, error: 'Validation failed' };
  }
};