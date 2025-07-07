import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code2, MessagesSquare, WandSparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const features = [
    {
      icon: <Code2 className="w-10 h-10 text-primary" />,
      title: "Powerful Snippet Manager",
      description: "Create public snippets to share with the community or private links for personal use. Your code, your choice.",
    },
    {
      icon: <MessagesSquare className="w-10 h-10 text-primary" />,
      title: "Community Forums",
      description: "Join discussions, ask questions, and share knowledge with fellow developers in our dedicated forum spaces.",
    },
    {
      icon: <WandSparkles className="w-10 h-10 text-primary" />,
      title: "AI Code Review",
      description: "Get instant feedback on your code. Our AI assistant helps you find bugs and suggests optimizations.",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 lg:py-40 text-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
              Your Code, Your Community
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              The ultimate platform to share code snippets, get AI-powered reviews, and engage in developer discussions.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="btn-gradient shadow-subtle hover:shadow-subtle-hover text-lg px-8 py-6">
              <Link href="/explore">
                Explore Snippets
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
              <Link href="/forums">
                Join the Discussion
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24 bg-muted/50 dark:bg-card">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Everything a Developer Needs</h2>
            <p className="max-w-xl mx-auto text-muted-foreground md:text-lg">
              From sharing code to community engagement, we've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 flex flex-col items-center shadow-subtle">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  {feature.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2 flex-grow">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Ready to Get Started?</h2>
            <p className="mt-4 mb-8 text-lg opacity-90">
              Create an account today and unlock all features. It's free!
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90">
              <Link href="/register">
                Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
