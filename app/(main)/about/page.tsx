import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Code2, Heart, MessagesSquare, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      title: "Share & Discover Code",
      description: "A place to share private code snippets with a link or publish them publicly for the community to see, vote, and comment on.",
    },
    {
      title: "Community Forums",
      description: "Engage in discussions, ask questions, and share knowledge with fellow developers on various topics.",
    },
    {
      title: "AI-Powered Tools",
      description: "Leverage AI for code reviews and debugging to improve code quality and accelerate development.",
    },
  ];

  const otherProjects = [
    {
      name: "Jeketian",
      description: "A dedicated fanbase website for a popular idol group.",
      url: "https://www.jeketian.web.id",
    },
    {
      name: "nephyy.tech",
      description: "My personal portfolio and blog website.",
      url: "https://nephyy.tech",
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
          About Nephyy ShareCode
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern platform built for developers to accelerate learning, collaboration, and innovation through shared code and community discussion.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
             <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-bold">Meet the Developer</h2>
          <p className="text-muted-foreground mt-2">This project is proudly developed and maintained by a solo developer.</p>
          <Card className="mt-6 p-6 flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" />
              <AvatarFallback className="text-3xl">N</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">Nephyy</h3>
              <p className="text-muted-foreground">Full-Stack Developer</p>
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">My Other Projects</h3>
          {otherProjects.map((project) => (
            <Link href={project.url} target="_blank" rel="noopener noreferrer" key={project.name}>
              <Card className="hover:border-primary transition-colors">
                <CardHeader className="flex flex-row justify-between items-center">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <ArrowUpRight className="text-muted-foreground" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Support the Project</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            If you find this website useful, please consider supporting its future development. Every donation is highly appreciated!
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <Card className="p-6 w-full max-w-sm">
            <CardHeader className="p-0 text-center">
              <div className="mx-auto w-fit p-3 rounded-full bg-primary/10 mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Donate with QRIS</CardTitle>
              <CardDescription>Scan with your mobile banking or e-wallet app.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-6">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
                <Image src="/nephyy.jpg" alt="QRIS Donation Code" layout="fill" objectFit="contain" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
