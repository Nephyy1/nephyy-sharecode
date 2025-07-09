"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, Copy, Eye, EyeOff } from "lucide-react";

export function ApiKeyDisplay({ apiKey }: { apiKey: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const obscuredKey = `neph_********************${apiKey.slice(-4)}`;

  return (
    <div className="flex items-center gap-2">
      <Input readOnly value={isVisible ? apiKey : obscuredKey} className="font-mono text-sm" />
      <Button variant="ghost" size="icon" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </Button>
      <Button variant="outline" size="icon" onClick={handleCopy}>
        {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
      </Button>
    </div>
  );
}
