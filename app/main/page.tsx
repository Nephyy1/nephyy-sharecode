import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex justify-center items-start">
      <Card className="w-full max-w-4xl shadow-subtle">
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Snippet</CardTitle>
          <CardDescription>Share your code instantly. Anyone with the link can view it.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="code-area">Code</Label>
              <Textarea
                id="code-area"
                placeholder="Paste your code here..."
                className="min-h-[400px] font-mono text-xs focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="language">Syntax Highlighting</Label>
               <Select>
                <SelectTrigger id="language" className="w-full sm:w-[280px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="plaintext">Plain Text</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end bg-gray-50/70 p-4 rounded-b-lg">
          <Button size="lg" className="btn-gradient w-full sm:w-auto shadow-subtle hover:shadow-subtle-hover">
            <Link2 className="w-4 h-4 mr-2"/>
            Create Share Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
