import { WandSparkles } from "lucide-react";

export function AppHeader() {
  return (
    <header className="py-4 px-4 md:px-6 border-b border-primary/20 shadow-lg">
      <div className="container mx-auto flex items-center gap-3">
        <WandSparkles className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-headline font-bold tracking-tighter text-foreground">
          Gemini Muse
        </h1>
      </div>
    </header>
  );
}
