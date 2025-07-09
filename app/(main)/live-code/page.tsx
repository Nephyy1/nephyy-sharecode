"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { LoaderCircle, Play, Copy, Check } from "lucide-react";
import { Editor } from "@monaco-editor/react";

const languageOptions = [
  { value: "javascript", label: "JavaScript", defaultCode: "console.log('Hello from JavaScript!');" },
  { value: "python", label: "Python", defaultCode: "print('Hello from Python!')" },
  { value: "typescript", label: "TypeScript", defaultCode: "console.log('Hello from TypeScript!');" },
];

export default function LiveCodePage() {
  const [code, setCode] = useState(languageOptions[0].defaultCode);
  const [language, setLanguage] = useState(languageOptions[0].value);
  const [output, setOutput] = useState("Click 'Run Code' to see the output here.");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
      setOutput(result.output || 'Execution finished with no output.');
    } catch (error) {
      setOutput("Failed to run code. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyOutput = () => {
    if(output && !isLoading) {
      navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
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
        
        <div>
           <div className="bg-zinc-900 rounded-lg shadow-2xl h-full flex flex-col">
            <div className="bg-zinc-800/80 px-4 py-2 flex items-center justify-between rounded-t-lg border-b border-zinc-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <span className="text-sm text-zinc-400">Console Output</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopyOutput}>
                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
              </Button>
            </div>
            <pre className="w-full flex-grow p-4 overflow-auto text-sm text-white whitespace-pre-wrap break-words">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
