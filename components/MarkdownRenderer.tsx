"use client";

import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none break-words">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
