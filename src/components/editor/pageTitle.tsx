import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'

const PageTitle = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const title = pageConfigSelectors.useTitle()

  return (
    <div className="editor-page-title">
      <div className="editor-page-title-text" style={{ color: `${colorTheme.pageTitleText}` }}>
        {title}
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
