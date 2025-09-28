'use client';

import { useFormState } from 'react-dom';
import { createPrompts, type FormState } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyButton } from '@/components/copy-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader, Sparkles, Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useTransition } from 'react';
import { SubmitButton } from './submit-button';

const artisticStyles = [
  'Moody Portrait',
  'Cinematic City Night',
  'Vintage Landscape',
  'Sci-Fi / Futuristic',
  'Photorealistic',
  'Abstract',
  'Anime / Manga',
  'Fantasy',
];

export function PromptGenerator() {
  const initialState: FormState = { variations: [], message: null };
  const [state, dispatch] = useFormState(createPrompts, initialState);
  const [isPending, startTransition] = useTransition();

  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleFormAction = (formData: FormData) => {
    startTransition(() => {
      dispatch(formData);
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Craft the Perfect Visual</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter a concept, pick a style, and let AI generate detailed prompts for your next masterpiece.
        </p>
      </div>

      <form action={handleFormAction} className="mt-10 max-w-3xl mx-auto space-y-8">
        <div className="grid gap-2">
            <label htmlFor="concept" className="font-medium text-lg">What do you want to create?</label>
            <Textarea
              id="concept"
              name="concept"
              placeholder="e.g., A majestic lion wearing a crown in a futuristic city"
              className="min-h-[120px] text-base bg-secondary/50 border-border focus:ring-accent"
              required
            />
        </div>

        <div className="grid gap-4">
            <h3 className="font-medium text-lg">Choose an artistic style (optional)</h3>
            <input type="hidden" name="style" value={selectedStyle || ''} />
            <div className="flex flex-wrap gap-2">
              {artisticStyles.map((style) => (
                <Button
                  key={style}
                  type="button"
                  variant={selectedStyle === style ? 'default' : 'secondary'}
                  onClick={() => setSelectedStyle(current => current === style ? null : style)}
                  className="rounded-full transition-all duration-200"
                >
                  {style}
                </Button>
              ))}
            </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <SubmitButton />
        </div>
        
        {state?.errors?.concept && !isPending && (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Input Error</AlertTitle>
                <AlertDescription>
                    {state.errors.concept[0]}
                </AlertDescription>
            </Alert>
        )}
      </form>

      <div className="mt-16">
        {isPending && (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-card">
                <CardHeader>
                  <Skeleton className="h-6 w-32 bg-muted/80" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-muted/80" />
                    <Skeleton className="h-4 w-full bg-muted/80" />
                    <Skeleton className="h-4 w-5/6 bg-muted/80" />
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Skeleton className="h-10 w-10 rounded-md bg-muted/80" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {state.message && !isPending && state.variations.length === 0 && (
          <div className="max-w-2xl mx-auto">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {!isPending && state.variations.length > 0 && (
          <div className="space-y-10 animate-in fade-in duration-500">
             <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-headline font-bold">Your Generated Prompts</h3>
                <p className="mt-2 text-muted-foreground">Copy your favorite and start creating!</p>
            </div>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {state.variations.map((prompt, index) => (
                <Card key={index} className="flex flex-col bg-card/80 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-primary-foreground/90">
                      <Sparkles className="w-5 h-5 text-accent" />
                      Variation {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{prompt}</p>
                  </CardContent>
                  <CardFooter className="bg-secondary/20 justify-end py-3 px-6">
                    <CopyButton textToCopy={prompt} className="hover:bg-accent/20" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
