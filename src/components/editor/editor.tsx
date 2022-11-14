import { useState } from 'react'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import UndoButton from './undoButton'
import ToggleSidebarButton from './toggleSidebarButton'
import RedoButton from './redoButton'
import TogglePageinfoButton from './togglePageinfoButton.'
import Breadcrumbs from './breadcrumbs'
import Toolset from '../toolset/toolset'
import { EditorState } from '../types'
import useEditorResize from './hooks/useEditorResize'
import useKeydownHandler from './hooks/useKeydownHandler'
import ZoomOutButton from './zoomOutButton'
import CurrentScale from './currentScale'
import ZoomInButton from './zoomInButton'
import PageTitle from './pageTitle'
import Page from './page'

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
  const [editorState, setEditorState] = useState<EditorState>('CURSOR')
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
      <PageTitle />
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
      <Toolset editorState={editorState} setEditorState={setEditorState} />
      <Page />
    </div>
  )
}

export default Editor
