import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'

const CurrentScale = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const scale = pageConfigSelectors.usePageScale()

  return (
    <div className="editor-current-scale" style={{ color: colorTheme.currentScaleText }}>
      {Math.floor(scale * 100)}%
    </div>
  )
}

export default CurrentScale
