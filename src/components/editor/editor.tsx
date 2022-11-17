import { useState } from 'react'
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
      <Toolset />
      <Page />
    </div>
  )
}

export default Editor
