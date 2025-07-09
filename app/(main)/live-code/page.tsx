"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { LoaderCircle, Play } from "lucide-react";
import { Editor } from "@monaco-editor/react";

const JsIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M0 0h24v24H0V0zm22.034 18.262H1.964V5.738h20.07v12.524zM8.343 16.43H5.722V7.568h2.621v8.862zm4.127 0h-2.62V7.568h2.62v8.862zm4.129 0h-2.621V7.568h2.621v8.862z" fill="#F7DF1E" />
  </svg>
);

const TsIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M1.5 1.5v21h21V1.5h-21zM21 21H3V3h18v18zM9.23 7.5h6.92v2.31H11.5v2.4h4.14v2.3H11.5v2.41h4.69v2.31H9.23V7.5z" fill="#3178C6" />
  </svg>
);

const PythonIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M12 2.502c-5.244 0-9.492 4.248-9.492 9.492 0 4.316 2.88 7.98 6.744 9.108.312.06.468-.12.468-.288 0-.144-.012-.66-.012-1.2-2.796.612-3.384-1.2-3.384-1.2-.288-.72-1.116-1.128-1.116-1.128-.564-.384.048-.372.048-.372.624.048.96.648.96.648.564 1.344 1.476.96 1.836.732.06-.564.216-.96.396-1.176-1.404-.156-2.88-.708-2.88-3.12 0-.696.252-1.272.66-1.716-.06-.156-.288-.816.06-1.692.528-.168 1.728.636 1.728.636.504-.144 1.044-.216 1.572-.216.528 0 1.068.072 1.572.216 0 0 1.2-.804 1.728-.636.348.876.12 1.536.06 1.692.408.444.66.996.66 1.716 0 2.412-1.476 2.964-2.88 3.12.228.192.432.564.432 1.152 0 .828-.012 1.5-.012 1.704 0 .168.156.348.468.288 3.864-1.128 6.744-4.792 6.744-9.108C21.492 6.75 17.244 2.502 12 2.502" fill="#3776AB" />
  </svg>
);

const languageOptions = [
  { value: "javascript", label: "JavaScript", icon: <JsIcon /> },
  { value: "typescript", label: "TypeScript", icon: <TsIcon /> },
  { value: "python", label: "Python", icon: <PythonIcon /> },
];

export default function LiveCodePage() {
  const [code, setCode] = useState("console.log('Hello, Nephyy ShareCode!');");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };
  
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

  const selectedLanguageIcon = languageOptions.find(opt => opt.value === language)?.icon;

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Live Code Editor</CardTitle>
              <CardDescription>Write and execute your code directly in the browser.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <div className="flex items-center gap-2">
                      {selectedLanguageIcon}
                      <SelectValue placeholder="Select Language" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center gap-2">
                          {lang.icon}
                          <span>{lang.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-grow rounded-lg overflow-hidden border">
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
              <CardTitle>Output</CardTitle>
              <CardDescription>The result of your code execution will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="w-full h-[540px] bg-zinc-900 text-white rounded-md p-4 overflow-y-auto text-sm whitespace-pre-wrap break-all">
                <code>{output}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
