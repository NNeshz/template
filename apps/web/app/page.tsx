import { Button } from "@template/ui/components/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
      <h1 className="text-4xl font-bold">Template</h1>
      <p className="text-muted-foreground">Get started by editing this page.</p>
      <div className="flex gap-3">
        <Button>Get started</Button>
        <Button variant="outline">Learn more</Button>
      </div>
    </main>
  );
}
