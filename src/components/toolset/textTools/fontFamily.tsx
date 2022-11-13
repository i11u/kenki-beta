import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'

type Props = {
  fontFamily: string
  setFontFamily: (fontFamily: string) => void
}

const FontFamily = ({ fontFamily, setFontFamily }: Props) => {
  const colorTheme = colorThemeSelector.useColorTheme()
  return (
    <div className="toolset-text-tools-item">
      <div
        className="toolset-text-tools-item-title"
        style={{
          color: `${colorTheme.text}`,
        }}
      >
        font <code>⌘+f</code>
      </div>
      <div className="toolset-text-tools-item-content">
        <svg
          id="_レイヤー_1"
          className="toolset-text-tools-item-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M10.879,86.879c6.068,.934,12.186,1.297,18.32,.972,1.349-.071,2.5-1.098,2.5-2.5,0-1.299-1.145-2.572-2.5-2.5-5.669,.3-11.377,.071-16.991-.793-1.333-.205-2.688,.338-3.075,1.746-.325,1.184,.404,2.869,1.746,3.075h0Z" />
          <path d="M23.031,84.337c6.55-18.837,14.018-37.347,22.413-55.437,2.381-5.131,4.836-10.228,7.359-15.291l-4.569-.597c5.432,17.989,10.863,35.979,16.295,53.968,1.555,5.151,3.111,10.302,4.666,15.454,.928,3.072,5.755,1.763,4.821-1.329-5.432-17.989-10.863-35.979-16.295-53.968-1.555-5.151-3.111-10.302-4.666-15.454-.584-1.936-3.571-2.602-4.569-.597-9.049,18.163-17.198,36.776-24.399,55.748-2.036,5.363-3.993,10.756-5.877,16.174-.443,1.275,.505,2.734,1.746,3.075,1.376,.378,2.63-.466,3.075-1.746h0Z" />
          <path d="M65.392,85.203h24.717c3.217,0,3.223-5,0-5h-24.717c-3.217,0-3.223,5,0,5h0Z" />
          <path d="M35.412,55.899c9.101-.437,18.202-.874,27.303-1.312,3.203-.154,3.222-5.155,0-5-9.101,.437-18.202,.874-27.303,1.312-3.203,.154-3.222,5.155,0,5h0Z" />
        </svg>
        <div
          className="toolset-text-tools-item-collapse"
          style={{
            color: `${colorTheme.text}`,
            backgroundColor: `${colorTheme.collapseMenuBackground}`,
            boxShadow: `0 1px 1px 1px ${colorTheme.boxShadow}`,
          }}
        >
          <div className="toolset-text-tools-item-collapse-text">{fontFamily}</div>
          <div
            className="toolset-text-tools-item-collapse-separator"
            style={{ backgroundColor: `${colorTheme.text}` }}
          />
          <div className="toolset-text-tools-item-collapse-button">▼</div>
        </div>
      </div>
    </div>
  )
}

export default FontFamily
