import { useState } from 'react'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'

const CurrentScale = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const [scale, setScale] = useState(100)

  return <div className="editor-current-scale">{scale}%</div>
}

export default CurrentScale
