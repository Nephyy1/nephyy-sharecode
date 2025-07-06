"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";

export function SnippetActions() {
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={handleCopy}>
        {isCopied ? (
          <Check className="mr-2 h-4 w-4 text-green-500" />
        ) : (
          <Copy className="mr-2 h-4 w-4" />
        )}
        {isCopied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
