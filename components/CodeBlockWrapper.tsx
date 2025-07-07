"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeBlockWrapper({ code, language }: { code: string, language: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopyCode}
      >
        {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
      </Button>
      <SyntaxHighlighter language={language.toLowerCase()} style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0.5rem' }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
