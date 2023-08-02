import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";

export default function ItalicTextPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor) return;
    const removeNodeListener = editor.registerNodeTransform(
      TextNode,
      (node) => {
        if (!node) return;
        const textContent = node.getTextContent();

        if (textContent.includes("_") && textContent.length > 1) {
          node.toggleFormat("italic");
          node.setTextContent(textContent.replace("_", ""));
        }
      }
    );
    return () => removeNodeListener();
  }, [editor]);
}
