import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'

const PageTitle = () => {
  let currentPageId: string
  let title: string
  const colorTheme = colorThemeSelector.useColorTheme()

  return (
    <div className="editor-page-title">
      <div className="editor-page-title-text" style={{ color: `${colorTheme.pageTitleText}` }}>
        鍵記 kenki
      </div>
      <div
        className="editor-page-title-underline"
        style={{
          backgroundColor: `${colorTheme.pageTitleUnderline}`,
        }}
      />
    </div>
  )
}

export default PageTitle
