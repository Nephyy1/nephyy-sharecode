"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { LoaderCircle, Play } from "lucide-react";
import { Editor } from "@monaco-editor/react";

const languageOptions = [
  { value: "javascript", label: "JavaScript", defaultCode: "console.log('Hello from JavaScript!');" },
  { value: "python", label: "Python", defaultCode: "print('Hello from Python!')" },
  { value: "typescript", label: "TypeScript", defaultCode: "console.log('Hello from TypeScript!');" },
];

export default function LiveCodePage() {
  const [code, setCode] = useState(languageOptions[0].defaultCode);
  const [language, setLanguage] = useState(languageOptions[0].value);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (value: string) => {
    const selectedLanguage = languageOptions.find(opt => opt.value === value);
    setLanguage(value);
    if (selectedLanguage) {
      setCode(selectedLanguage.defaultCode);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };
  
  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("Executing...");

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
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Live Code Editor</CardTitle>
              <CardDescription>Write and execute code in various languages directly.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
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
              <div className="flex-grow rounded-lg overflow-hidden border min-h-[400px]">
                 <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      contextmenu: false,
                      scrollBeyondLastLine: false,
                    }}
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
              <CardTitle>Console Output</CardTitle>
              <CardDescription>The result of your code execution will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="w-full h-full min-h-[500px] bg-zinc-900 text-white rounded-md p-4 overflow-auto text-sm whitespace-pre-wrap break-words">
                <code>{output}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
