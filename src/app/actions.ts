'use server';

import { generatePromptVariations } from '@/ai/flows/generate-prompt-variations';
import { z } from 'zod';

export interface FormState {
  variations: string[];
  message: string | null;
  errors?: {
    concept?: string[];
    style?: string[];
    subject?: string[];
  };
}

const schema = z.object({
  concept: z.string().min(3, { message: 'Please enter a concept with at least 3 characters.' }),
  style: z.string().optional(),
  subject: z.string().optional(),
});

export async function createPrompts(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    concept: formData.get('concept'),
    style: formData.get('style'),
    subject: formData.get('subject'),
  });

  if (!validatedFields.success) {
    return {
      variations: [],
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { concept, style, subject } = validatedFields.data;
  const fullConcept = style ? `${concept} in a ${style} style` : concept;

  try {
    const variations = await generatePromptVariations({ concept: fullConcept, subject: subject || '' });
    if (variations && variations.length > 0) {
      return { variations, message: null };
    }
    return { variations: [], message: 'No variations were generated. Please try a different concept or style.' };
  } catch (e) {
    console.error(e);
    return { variations: [], message: 'An unexpected error occurred on the server. Please try again.' };
  }
}
