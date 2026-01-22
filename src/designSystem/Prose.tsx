import { Components } from 'react-markdown';

export const Prose: Components = {
  h1: ({ children }) => (
    <h1 className="h1 text-slate-900 mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="h2 text-slate-900 mt-6 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="h3 text-slate-800 mt-5 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="body1 text-slate-700 mb-4">{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="blockquote italic text-slate-600 border-l-4 border-slate-300 pl-4 my-4">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="body1 text-slate-700 list-disc pl-6 mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="body1 text-slate-700 list-decimal pl-6 mb-4 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="body1">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  hr: () => (
    <hr className="border-0 border-t border-slate-200 my-8" />
  ),
};
