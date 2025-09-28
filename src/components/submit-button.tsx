'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader, Sparkles } from 'lucide-react';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full md:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
      {pending ? (
        <>
          <Loader className="mr-2 h-5 w-5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Prompts
        </>
      )}
    </Button>
  );
}
