import { KenkiElement } from '../types'
import Grid from '../page/page/grid'
import Blocks from '../page/page/blocks'
import Relations from '../page/page/relations'
import CursorTSX from '../page/page/cursor'

const Page = () => {
  let elements: KenkiElement[]

  return (
    <div className="editor-page" style={{ width: 1920, height: 1080 }}>
      <Grid />
      <Blocks />
      <Relations />
      <CursorTSX />
    </div>
  )
}

export default Page
