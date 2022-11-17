import React, { useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { PageUtils } from '../../../apis/page'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'
import { blocksActions } from '../../../jotai-hooks/blocks/action'
import { PageConfig, pageConfigAtom } from '../../../jotai-hooks/pageConfig/atom'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import useOnResizeEffect from '../../../hooks/useOnResizeEffect'
import useThrottleCallback from '../../../hooks/useThrottleCallback'
import { editorConfigSelectors } from '../../../jotai-hooks/editorConfig/selector'
import useOnWheelPageEffect from '../../../hooks/useOnWheelPageEffect'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import Grid from './grid'
import Relations from './relations'
import CursorTSX from './cursor'
import Blocks from './blocks'

const Page = () => {
  const [pageConfig, setPageConfig] = useAtom(pageConfigAtom)
  const [previousPageConfig, setPreviousPageConfig] = useState<PageConfig>({ ...pageConfig })
  const id = blockSelectors.useEditingBlockId()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const addBlock = blocksActions.useAddBlock()
  const gridNum = pageConfigSelectors.useGridNum()
  const pageRef = useRef<HTMLDivElement>(null)
  const sidebarIsOpen = editorConfigSelectors.useSidebarLeftIsOpen()
  useOnResizeEffect(gridNum.rowNum, pageRef)
  const colorTheme = colorThemeSelector.useColorTheme()

  // const style = PageUtils.style(pageConfig.aspectRatio)

  const throttle = useThrottleCallback()

  useOnWheelPageEffect(pageRef, setPreviousPageConfig, setPageConfig, throttle)

  return (
    // <div className="editor-page" />
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      id="page"
      className="editor-page"
      ref={pageRef}
      onMouseDown={(e) =>
        e.target === pageRef.current
          ? PageUtils.handleOnMouseDown({
              e,
              gridNum,
              id,
              changeBlockStatus,
              changeBlockPosition,
              addBlock,
            })
          : (e.target as HTMLDivElement).focus()
      }
    >
      <Grid />
      <Blocks />
      <Relations />
      <CursorTSX />
    </div>
  )
}

export default React.memo(Page)
