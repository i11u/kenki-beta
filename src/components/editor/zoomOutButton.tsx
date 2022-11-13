import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'

const ZoomOutButton = () => {
  let redo: () => void
  const colorTheme = colorThemeSelector.useColorTheme()

  return (
    <button
      type="button"
      className="editor-right-buttons-button"
      style={{
        background: colorTheme.editorButton,
        boxShadow: `0 1px 1px 1px ${colorTheme.boxShadow}`,
      }}
      onClick={() => redo()}
    >
      <svg
        id="_レイヤー_1"
        className="editor-right-buttons-button-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path d="M26.201,52.098c3.424-.64,6.907,.916,10.237,1.487,3.891,.668,7.822,.417,11.746,.294,7.946-.25,15.892-.501,23.838-.751,3.21-.101,3.224-5.102,0-5-8.112,.256-16.223,.511-24.335,.767-3.757,.118-7.558,.407-11.26-.396-3.872-.839-7.564-1.968-11.556-1.222-1.328,.248-2.082,1.852-1.746,3.075,.383,1.393,1.743,1.995,3.075,1.746h0Z" />
      </svg>
    </button>
  )
}

export default ZoomOutButton
