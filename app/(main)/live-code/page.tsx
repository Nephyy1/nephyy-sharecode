"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { LoaderCircle, Play } from "lucide-react";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
];

export default function LiveCodePage() {
  const [code, setCode] = useState("console.log('Hello, Nephyy ShareCode!');");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("");

    try {
      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      const result = await response.json();
      setOutput(result.output);

    } catch (error) {
      setOutput("Failed to run code. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Code Editor</CardTitle>
              <CardDescription>Write and execute your code directly in the browser.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="code-area">Your Code</Label>
                <Textarea
                  id="code-area"
                  placeholder="Enter your code here..."
                  className="min-h-[400px] font-mono text-sm bg-zinc-900 text-white dark:bg-zinc-800"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </CardContent>
             <CardFooter className="flex justify-end">
              <Button onClick={handleRunCode} disabled={isLoading} className="btn-gradient">
                {isLoading ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                Run Code
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>The result of your code execution will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="w-full h-[480px] bg-zinc-900 text-white rounded-md p-4 overflow-y-auto text-sm">
                <code>{output}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
