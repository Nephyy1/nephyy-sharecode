import { Button } from "@/components/ui/button";
import { CodeXml, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24">
      <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white inline-block mb-6 shadow-lg">
        <CodeXml className="w-10 h-10" />
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter max-w-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
        Share, Collaborate, and Review Code Instantly
      </h1>
      <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
        The ultimate platform for developers. Create shareable code snippets, engage in live coding, and get AI-powered feedback with ease.
      </p>
      <div className="mt-8">
        <Button asChild size="lg" className="btn-gradient shadow-subtle hover:shadow-subtle-hover text-lg px-8 py-6">
          <Link href="/create">
            Start Sharing Code <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
