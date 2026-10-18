import { z } from 'zod';

const firstNameSchema = z
  .string({ 
    required_error: 'First name is required.',
  })
  .min(1, 'First name cannot be empty.');

const middleNameSchema = z
  .string()
  .optional();

const lastNameSchema = z
  .string({ 
    required_error: 'Last name is required.',
  })
  .min(1, 'Last name cannot be empty.');

const emailSchema = z
  .string()
  .email('Invalid email address.')
  .trim()
  .toLowerCase();

const passwordSchema = z
  .string()
  .min(
    12,
    'Password must contain at least 12 characters.',
  )
  .max(
    128,
    'Password cannot exceed 128 characters.',
  );

const registerSchema = z
  .object({
    body: z.object({ 
      firstName: firstNameSchema,
      middleName: middleNameSchema,
      lastName: lastNameSchema,
      email: emailSchema,
      password: passwordSchema,
    }),

    params: z.object({}),

    query: z.object({}),
  });

const loginSchema = z
  .object({ 
    body: z.object({ 
      email: emailSchema,
      password: z.string().min(1, 'Password is required'),
    }),

    params: z.object({}),

    query: z.object({}),
  });

export { 
  registerSchema,
  loginSchema,
};
