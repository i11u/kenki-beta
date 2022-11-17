import { match } from 'ts-pattern'
import TextTools from './textTools/textTools'
import CursorTools from './cursorTools'
import { modeSelectors } from '../../jotai-hooks/mode/selector'

const Toolset = () => {
  const mode = modeSelectors.useCurrentMode()

  return (
    <div className="toolset">
      {match(mode)
        .with('CURSOR', () => <CursorTools />)
        .with('TEXT', () => <TextTools />)
        .with('RECT', () => <div>image tool</div>)
        .with('ELLIPSE', () => <div>shape tool</div>)
        // .with('LINE', () => <div>brush tool</div>)
        // .with('ARROW', () => <div>eraser tool</div>)
        .with('PICTURE', () => <div>pen tool</div>)
        .with('VIDEO', () => <div>pen tool</div>)
        .otherwise(() => (
          <div />
        ))}
    </div>
  )
}

export default Toolset
