import { z } from 'zod';

export const UPDATE_USER_VALIDATION = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  gender: z.string().min(1, 'Gender is required'),
  height: z.coerce.number().min(0, 'Height must be at least 0 cm'),
});
