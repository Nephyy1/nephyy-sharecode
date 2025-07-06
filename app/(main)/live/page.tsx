import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

export default function LiveCodingPage() {
  return (
    <div className="text-center">
      <Card className="w-full max-w-3xl mx-auto shadow-subtle">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <Video className="w-7 h-7 text-primary"/> Live Coding Session
          </CardTitle>
          <CardDescription className="pt-2">
            Collaborate in real-time. Start a session and invite others to code with you. This feature requires login.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="p-16 my-4 border-2 border-dashed rounded-lg bg-secondary/50">
                <p className="text-muted-foreground">The collaborative editor and session controls will appear here.</p>
            </div>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button size="lg" className="btn-gradient shadow-subtle hover:shadow-subtle-hover">
              Start a New Session
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
