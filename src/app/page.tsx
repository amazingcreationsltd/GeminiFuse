import { PromptGenerator } from "@/components/prompt-generator";
import { AppHeader } from "@/components/app-header";
import { AppFooter } from "@/components/app-footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1">
        <PromptGenerator />
      </main>
      <AppFooter />
    </div>
  );
}
