import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'

const ZoomInButton = () => {
  const scale = pageConfigSelectors.usePageScale()
  const changeScale = pageConfigActions.useChangeScale()
  const colorTheme = colorThemeSelector.useColorTheme()

  return (
    <button
      type="button"
      className="editor-right-buttons-button"
      style={{
        background: colorTheme.editorButton,
        boxShadow: `0 1px 1px 1px ${colorTheme.boxShadow}`,
      }}
      onClick={() => changeScale(scale + 0.1)}
    >
      <svg
        id="_レイヤー_1"
        className="editor-right-buttons-button-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill={colorTheme.icon}
      >
        <path d="M22.274,53.657c18.96,1.737,38.11-3.916,56.948-.19,1.323,.262,2.699-.377,3.075-1.746,.338-1.229-.415-2.812-1.746-3.075-19.353-3.827-38.831,1.793-58.277,.011-1.346-.123-2.5,1.237-2.5,2.5,0,1.455,1.15,2.376,2.5,2.5h0Z" />
        <path d="M46.225,19.852c1.028,16.625,1.578,33.278,1.635,49.935,.016,4.723-.009,9.447-.07,14.17-.042,3.219,4.958,3.22,5,0,.216-16.655-.048-33.316-.804-49.955-.214-4.719-.47-9.435-.761-14.15-.198-3.196-5.199-3.219-5,0h0Z" />
      </svg>
    </button>
  )
}

export default ZoomInButton
