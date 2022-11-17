import { useState } from 'react'
import { match } from 'ts-pattern'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import UndoButton from './header/undoButton'
import ToggleSidebarButton from './header/toggleSidebarButton'
import RedoButton from './header/redoButton'
import TogglePageinfoButton from './header/togglePageinfoButton.'
import Breadcrumbs from './header/breadcrumbs'
import Toolset from '../toolset/toolset'
import useEditorResize from './hooks/useEditorResize'
import useKeydownHandler from './hooks/useKeydownHandler'
import ZoomOutButton from './header/zoomOutButton'
import CurrentScale from './header/currentScale'
import ZoomInButton from './header/zoomInButton'
import Page from './page'
import { Mode } from '../../jotai-hooks/mode/atom'
import { modeSelectors } from '../../jotai-hooks/mode/selector'

type Props = {
  workingModuleIndex: number
  sidebarIsVisible: boolean
  sidebarWidth: number
  setSidebarIsVisible: (sidebarIsVisible: boolean) => void
  pageinfoIsVisible: boolean
  pageinfoWidth: number
  setPageInfoIsVisible: (pageinfoIsVisible: boolean) => void
}

const Editor = ({
  workingModuleIndex,
  sidebarIsVisible,
  sidebarWidth,
  setSidebarIsVisible,
  pageinfoIsVisible,
  pageinfoWidth,
  setPageInfoIsVisible,
}: Props) => {
  const [editorState, setEditorState] = useState<Mode>('CURSOR')
  const colorTheme = colorThemeSelector.useColorTheme()
  const mode = modeSelectors.useCurrentMode()

  /*
   * Register event handlers on keydown.
   * */
  useKeydownHandler()

  /*
   * Register event handlers on resizing window.
   * */
  useEditorResize()

  return (
    <div
      className="editor"
      style={{
        backgroundColor: colorTheme.editorBackground,
        left: `${sidebarIsVisible ? sidebarWidth : 0}px`,
        width: `${
          window.innerWidth - (sidebarIsVisible ? sidebarWidth : 0) - (pageinfoIsVisible ? pageinfoWidth : 0)
        }px`,
      }}
    >
      <div
        className="editor-left-buttons"
        style={{
          top: '15px',
          left: `${(sidebarIsVisible ? sidebarWidth : 0) + 30}px`,
        }}
      >
        <UndoButton />
        <RedoButton />
        <ToggleSidebarButton />
        <TogglePageinfoButton />
      </div>
      <Breadcrumbs />
      <div
        className="editor-right-buttons"
        style={{
          top: '15px',
          right: `${(pageinfoIsVisible ? pageinfoWidth : 0) + 30}px`,
        }}
      >
        <ZoomOutButton />
        <CurrentScale />
        <ZoomInButton />
      </div>
      <div
        style={{
          top: '15px',
          right: `${(pageinfoIsVisible ? pageinfoWidth : 0) + 30}px`,
        }}
      >
        <div
          style={{
            color: colorTheme.hintText,
            top: '50px',
            right: `${(pageinfoIsVisible ? pageinfoWidth : 0) + 30}px`,
            backgroundColor: colorTheme.hintBackground,
            position: 'fixed',
            width: '190px',
            borderRadius: '3px',
            zIndex: 'var(--editor-floatings-z-index)',
            padding: '20px 20px',
            fontSize: '12px',
            lineHeight: '18px',
          }}
        >
          {match(mode)
            .with('CURSOR', () => (
              <div>
                <div style={{ color: colorTheme.hintText, fontSize: '14px', height: '20px' }}>Cursor</div>
                <hr style={{ border: `0.5px solid ${colorTheme.hintDivider}` }} />
                <div
                  style={{
                    display: 'flex',
                    gap: '15px',
                  }}
                >
                  <div style={{ display: 'block' }}>
                    <div style={{ color: 'lightgrey' }}>move cursor:</div>
                    <div style={{ color: 'lightgrey' }}>move faster:</div>
                    <div style={{ color: 'lightgrey' }}>scroll:</div>
                    <div style={{ color: 'lightgrey' }}>zoom in/out:</div>
                    <div style={{ color: 'lightgrey' }}>show hint:</div>
                    <div style={{ color: 'lightgrey' }}>show grid:</div>
                    <div style={{ color: 'lightgrey' }}>show border:</div>
                    <div style={{ color: 'lightgrey' }}>change theme:</div>
                  </div>
                  <div>
                    <div className="editor-hint">hjkl</div>
                    <div className="editor-hint">shift + hjkl</div>
                    <div className="editor-hint">ctrl + hjkl</div>
                    <div className="editor-hint">+/-</div>
                    <div className="editor-hint">f</div>
                    <div className="editor-hint">g</div>
                    <div className="editor-hint">v</div>
                    <div className="editor-hint">⌘+L</div>
                  </div>
                </div>
              </div>
            ))
            .with('BLOCKHINT', () => (
              <div>
                <div style={{ color: colorTheme.hintText, fontSize: '14px', height: '20px' }}>Block hint</div>
                <hr style={{ border: `0.5px solid ${colorTheme.hintDivider}` }} />
                <div
                  style={{
                    display: 'flex',
                    gap: '15px',
                  }}
                >
                  <div style={{ display: 'block' }}>
                    <div style={{ color: 'lightgrey' }}>select:</div>
                    <div style={{ color: 'lightgrey' }}>scroll:</div>
                    <div style={{ color: 'lightgrey' }}>zoom in/out:</div>
                    <div style={{ color: 'lightgrey' }}>go back:</div>
                  </div>
                  <div>
                    <div>hint (yellow text)</div>
                    <div className="editor-hint">ctrl + hjkl</div>
                    <div className="editor-hint">+/-</div>
                    <div className="editor-hint">Escape</div>
                  </div>
                </div>
              </div>
            ))
            .with('SELECT', () => (
              <div>
                <div style={{ color: colorTheme.hintText, fontSize: '14px', height: '20px' }}>Select</div>
                <hr style={{ border: `0.5px solid ${colorTheme.hintDivider}` }} />
                <div
                  style={{
                    display: 'flex',
                    gap: '15px',
                  }}
                >
                  <div style={{ display: 'block' }}>
                    <div style={{ color: 'lightgrey' }}>move block:</div>
                    <div style={{ color: 'lightgrey' }}>move faster:</div>
                    <div style={{ color: 'lightgrey' }}>zoom in/out:</div>
                    <div style={{ color: 'lightgrey' }}>show grid:</div>
                    <div style={{ color: 'lightgrey' }}>show border:</div>
                    <div style={{ color: 'lightgrey' }}>change theme:</div>
                    <div style={{ color: 'lightgrey' }}>go back:</div>
                  </div>
                  <div>
                    <div className="editor-hint">hjkl</div>
                    <div className="editor-hint">shift + hjkl</div>
                    <div className="editor-hint">+/-</div>
                    <div className="editor-hint">g</div>
                    <div className="editor-hint">v</div>
                    <div className="editor-hint">⌘+L</div>
                    <div className="editor-hint">Escape</div>
                  </div>
                </div>
              </div>
            ))
            .with('TEXT', () => (
              <div>
                <div style={{ color: colorTheme.hintText, fontSize: '14px', height: '20px' }}>Text</div>
                <hr style={{ border: `0.5px solid ${colorTheme.hintDivider}` }} />
                <div
                  style={{
                    display: 'flex',
                    gap: '15px',
                  }}
                >
                  <div style={{ display: 'block' }}>
                    <div style={{ color: 'lightgrey' }}>option:</div>
                    <div style={{ color: 'lightgrey' }}>change theme:</div>
                    <div style={{ color: 'lightgrey' }}>go back:</div>
                  </div>
                  <div>
                    <div>
                      hold <span className="editor-hint">⌥/alt</span>
                    </div>
                    <div className="editor-hint">⌘+L</div>
                    <div className="editor-hint">Escape</div>
                  </div>
                </div>
              </div>
            ))
            .otherwise(() => null)}
        </div>
      </div>
      <Toolset />
      <Page />
    </div>
  )
}

export default Editor
