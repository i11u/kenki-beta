// eslint-disable-next-line import/no-extraneous-dependencies
import { registerCodeHighlighting } from '@lexical/code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

const CodeHighlightPlugin = () => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => registerCodeHighlighting(editor), [editor])
  return null
}

export default CodeHighlightPlugin
