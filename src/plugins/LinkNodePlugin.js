import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LinkNode } from "@lexical/link";

export default function LinkNodePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor) return;
    const removeNodeListener = editor.registerNodeTransform(
      LinkNode,
      (node) => {
        if (!node) return;

        const dom = editor.getElementByKey(node.__key);
        if (!dom) return;
        dom.setAttribute("target", "_blank");
      }
    );
    return () => removeNodeListener();
  }, [editor]);

  return null;
}
