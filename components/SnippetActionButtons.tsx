"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Check, Copy, Link as LinkIcon, Edit } from "lucide-react";
import { DeleteSnippetButton } from "./DeleteSnippetButton";
import Link from "next/link";

export function SnippetActionButtons({ code, isOwner, snippetId, shortId }: { code: string; isOwner: boolean; snippetId: string; shortId: string | null }) {
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = (type: 'code' | 'link') => {
    if (type === 'code') {
      navigator.clipboard.writeText(code);
      setIsCodeCopied(true);
      setTimeout(() => setIsCodeCopied(false), 2000);
    } else {
      navigator.clipboard.writeText(currentUrl);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => handleCopy('code')}>
        {isCodeCopied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
        {isCodeCopied ? "Copied!" : "Copy Code"}
      </Button>
      <Button variant="outline" size="icon" onClick={() => handleCopy('link')}>
        {isLinkCopied ? <Check className="h-4 w-4 text-green-500" /> : <LinkIcon className="h-4 w-4" />}
      </Button>
      {isOwner && (
        <>
          <Button asChild variant="outline" size="icon">
            <Link href={`/s/${shortId}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteSnippetButton snippetId={snippetId} />
        </>
      )}
    </div>
  );
}
