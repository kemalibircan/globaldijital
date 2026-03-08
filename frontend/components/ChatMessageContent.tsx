'use client';

import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface ChatMessageContentProps {
  text: string;
  className?: string;
  /** Kullanıcı mesajları için markdown kapalı (düz metin) */
  allowMarkdown?: boolean;
}

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  code: ({ className: codeClassName, children, ...props }) => {
    const isInline = !codeClassName;
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-inherit" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={`block p-3 rounded-lg bg-black/10 dark:bg-white/10 overflow-x-auto text-xs ${codeClassName || ''}`} {...props}>
        {children}
      </code>
    );
  },
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-trustworthy-blue hover:opacity-80">
      {children}
    </a>
  ),
};

export default function ChatMessageContent({
  text,
  className = '',
  allowMarkdown = true,
}: ChatMessageContentProps) {
  if (!allowMarkdown) {
    return <p className={`text-sm leading-relaxed whitespace-pre-wrap ${className}`}>{text}</p>;
  }
  return (
    <div className={`text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 ${className}`}>
      <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>
    </div>
  );
}
