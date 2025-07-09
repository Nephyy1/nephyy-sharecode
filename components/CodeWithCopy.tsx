"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

export function CodeWithCopy({ code, language }: { code: string; language: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group bg-[#1E1E1E] rounded-lg my-4">
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-white/70" />}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          backgroundColor: 'transparent',
          borderRadius: '0.5rem',
        }}
        codeTagProps={{
          style: {
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: '0.875rem'
          }
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
