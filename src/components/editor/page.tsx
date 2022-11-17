import { useRef } from 'react'
import { KenkiElement } from '../types'
import Grid from '../page/page/grid'
import Blocks from '../page/page/blocks'
import Relations from '../page/page/relations'
import CursorTSX from '../page/page/cursor'
import usePreventPinch from '../../hooks/usePreventPinch'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import PageTitle from './pageTitle'

const Page = () => {
  let elements: KenkiElement[]
  const scale = pageConfigSelectors.usePageScale()
  const gridNum = pageConfigSelectors.useGridNum()

  /*
   * Prevent pinch zooming.
   * */
  const pageRef = useRef<HTMLDivElement>(null)
  usePreventPinch(pageRef)

  return (
    <div
      className="editor-page"
      ref={pageRef}
      style={{
        width: `${gridNum.colNum * 30}px`,
        height: `${gridNum.rowNum * 30}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
    >
      <PageTitle />
      <Grid />
      <Blocks />
      <Relations />
      <CursorTSX />
    </div>
  )
}

export default Page
