"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WandSparkles, LoaderCircle } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function ReviewPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please paste some code to analyze.");
      return;
    }
    setHasAnalyzed(true);
    setIsLoading(true);
    setResult("");
    setError("");

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data.result);

    } catch (err: any)      {
      setError("Failed to get review. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle>AI Code Review</CardTitle>
          <CardDescription>Paste your code to get AI-powered feedback on bugs, performance, and best practices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="function hello() { console.log('world'); }"
            className="min-h-[350px] font-mono text-xs focus:ring-1 focus:ring-primary/50"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isLoading}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyze} disabled={isLoading || !code} className="btn-gradient w-full sm:w-auto">
            {isLoading ? (
              <>
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <WandSparkles className="w-4 h-4 mr-2" />
                Analyze Code
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {hasAnalyzed && (
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
            <CardDescription>Suggestions from Gemini will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px] overflow-x-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <LoaderCircle className="w-8 h-8 animate-spin mb-4" />
                <p>Contacting AI assistant...</p>
              </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {result && <MarkdownRenderer content={result} />}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
