import { match } from 'ts-pattern'
import { useEffect } from 'react'
import { EditorState } from '../types'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import TextTools from './textTools/textTools'
import CursorTools from './cursorTools'

type Props = {
  editorState: EditorState
  setEditorState: (editorState: EditorState) => void
}

const Toolset = ({ editorState, setEditorState }: Props) => {
  const colorTheme = colorThemeSelector.useColorTheme()

  /*
   * Register event handlers on keydown.
   * */
  useEffect(() => {
    const callback = (e: KeyboardEvent): void =>
      match(editorState)
        .with('CURSOR', () =>
          match(e.key)
            .with('t', () => setEditorState('TEXT'))
            .otherwise(() => console.log(''))
        )
        .with('TEXT', () =>
          match(e.key)
            .with('Escape', () => setEditorState('CURSOR'))
            .otherwise(() => console.log(''))
        )
        .otherwise(() => console.log(''))

    document.addEventListener('keydown', callback)

    return function cleanup() {
      document.removeEventListener('keydown', callback)
    }
  }, [editorState, setEditorState])

  return (
    <div className="toolset">
      {match(editorState)
        .with('CURSOR', () => <CursorTools setEditorState={setEditorState} />)
        .with('TEXT', () => <TextTools />)
        .with('RECT', () => <div>image tool</div>)
        .with('ELLIPSE', () => <div>shape tool</div>)
        .with('LINE', () => <div>brush tool</div>)
        .with('ARROW', () => <div>eraser tool</div>)
        .with('PICTURE', () => <div>pen tool</div>)
        .with('VIDEO', () => <div>pen tool</div>)
        .otherwise(() => (
          <div />
        ))}
    </div>
  )
}

export default Toolset
