import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `
# My first blog

> im still working on this

## test sub

Hi there! Lorem ipsum.
`;

export default function MarkdownComponent(): any {
  return (
    <div className="prose prose-invert max-w-none">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
}
