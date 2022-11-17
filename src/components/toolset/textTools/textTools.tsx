import { useEffect, useState } from 'react'
import { match } from 'ts-pattern'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import TextToolsOptional from './textToolsOptional'
import FontFamily from './fontFamily'
import TextColor from './textColor'
import TextHighlight from './textHighlight'
import Alignment from './alignment'
import { modeSelectors } from '../../../jotai-hooks/mode/selector'

const TextTools = () => {
  const [optionKeyIsPressed, setOptionKeyIsPressed] = useState(false)
  const colorTheme = colorThemeSelector.useColorTheme()
  const [fontFamily, setFontFamily] = useState('sans-serif')
  const mode = modeSelectors.useCurrentMode()

  /*
   * Register event handlers on keydown.
   * */
  useEffect(() => {
    const keydownCallback = (e: KeyboardEvent) => {
      if (optionKeyIsPressed) {
        match(e.key)
          .with('h', () => setFontFamily('sans-serif'))
          .with('ArrowDown', () => setFontFamily('serif'))
          .otherwise(() => console.log(''))
      } else {
        match(e.key)
          .with('Alt', () => setOptionKeyIsPressed(true))
          .otherwise(() => console.log(''))
      }
    }
    const keyupCallback = (e: KeyboardEvent) => {
      if (optionKeyIsPressed) {
        match(e.key)
          .with('Alt', () => setOptionKeyIsPressed(false))
          .otherwise(() => console.log(''))
      } else {
        console.log('')
      }
    }
    document.addEventListener('keydown', keydownCallback)
    document.addEventListener('keyup', keyupCallback)
    return function cleanup() {
      document.removeEventListener('keydown', keydownCallback)
      document.removeEventListener('keyup', keyupCallback)
    }
  }, [optionKeyIsPressed, setOptionKeyIsPressed])

  return optionKeyIsPressed || mode === 'SELECT' ? (
    <TextToolsOptional />
  ) : (
    <div className="toolset-text-tools disabled">
      <div className="toolset-text-tools-description" style={{ color: `${colorTheme.text}` }}>
        toolset 1 (press option to switch toolsets)
      </div>
      <div
        className="toolset-text-tools-container"
        style={{
          backgroundColor: `${colorTheme.editorButton}`,
          boxShadow: `0 2px 2px 2px ${colorTheme.boxShadow}`,
        }}
      >
        <div className="toolset-text-tools-item" />
        <FontFamily fontFamily={fontFamily} setFontFamily={setFontFamily} />
        <TextColor />
        <TextHighlight />
        <Alignment />
        <div className="toolset-text-tools-item" />
      </div>
    </div>
  )
}

export default TextTools
