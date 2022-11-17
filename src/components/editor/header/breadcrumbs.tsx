import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'

const Breadcrumbs = () => {
  let currentPageId: string
  let breadcrumbs: string[]
  const colorTheme = colorThemeSelector.useColorTheme()

  return (
    <div className="editor-breadcrumbs" style={{ color: `${colorTheme.text}` }}>
      my-app / 鍵記 kenki
    </div>
  )
}

export default Breadcrumbs
