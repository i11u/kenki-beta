import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
// eslint-disable-next-line import/no-extraneous-dependencies
import { TRANSFORMERS } from '@lexical/markdown'
import React from 'react'
import { EditorState, LexicalEditor } from 'lexical'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import styled from 'styled-components'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import { Block } from '../../../jotai-hooks/blocks/atom'
import { BlockUtils } from '../../../apis/block'
import { blocksActions, useUpdateInnerHTML } from '../../../jotai-hooks/blocks/action'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'

const Placeholder = ({ id }: { id: string }) => {
  const colorTheme = colorThemeSelector.useColorTheme()
  return (
    <div id={id} className="editor-placeholder" style={{ color: `${colorTheme.placeholderText}` }}>
      Enter your text ...
    </div>
  )
}

const TextBlock = ({ block }: { block: Block }) => {
  const changeBlockSize = blocksActions.useChangeBlockSize()
  const updateInnerHTML = useUpdateInnerHTML()
  const colorTheme = colorThemeSelector.useColorTheme()

  function onChange(editorState: EditorState, lexicalEditor: LexicalEditor) {
    BlockUtils.handleOnInput({
      id: block.id,
      changeBlockSize,
      cellLength: 30,
      updateInnerHTML,
    })
  }

  // const [editor] = useLexicalComposerContext()
  // const [activeEditor, setActiveEditor] = useState(editor)
  // const [textColor, setTextColor] = useState('black')
  // const [highlightColor, setHighlightColor] = useState('yellow')
  // useEffect(() => {
  //   const callback = (e: KeyboardEvent) => {
  //     if (e.key === 'm') {
  //       if (e.shiftKey && e.metaKey) {
  //         e.preventDefault()
  //         if (textColor === 'black') {
  //           setTextColor('red')
  //         } else {
  //           setTextColor('black')
  //         }
  //       }
  //     } else if (e.key === 'n') {
  //       if (e.shiftKey && e.metaKey) {
  //         e.preventDefault()
  //         if (highlightColor === 'yellow') {
  //           setHighlightColor('blue')
  //         } else {
  //           setHighlightColor('yellow')
  //         }
  //       }
  //     } else if (e.key === 'c') {
  //       if (e.shiftKey && e.metaKey) {
  //         e.preventDefault()
  //         console.log('sadf')
  //         activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
  //       }
  //     }
  //   }
  //   document.addEventListener('keydown', callback)
  //   return function cleanup() {
  //     document.removeEventListener('keydown', callback)
  //   }
  // }, [activeEditor, highlightColor, textColor])

  return (
    <>
      {/* <div className="editor-container"> */}
      {/* <ToolbarPlugin /> */}
      {/* <div className="editor-inner"> */}
      <RichTextPlugin
        contentEditable={
          <StyledContentEditable
            id={`block-${block.id}`}
            className="editor-input text-block"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={false}
            aria-autocomplete="none"
            // textColor={textColor}
            // highlightColor={highlightColor}
            textColor={colorTheme.textBlockText}
            highlightColor="transparent"
          />
        }
        placeholder={<Placeholder id={`placeholder-${block.id}`} />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      {/* <TreeViewPlugin /> */}
      <AutoFocusPlugin />
      <CodeHighlightPlugin />
      <ListPlugin />
      <LinkPlugin />
      <ListMaxIndentLevelPlugin maxDepth={7} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <OnChangePlugin onChange={onChange} />
      {/* </div> */}
      {/* </div> */}
    </>
  )
}

const StyledContentEditable = styled(ContentEditable)<{ textColor: string; highlightColor: string }>`
  color: ${({ textColor }) => textColor};
  background-color: ${({ highlightColor }) => highlightColor};
  z-index: 0;
`

export default TextBlock
