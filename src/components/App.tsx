import { useEffect, useState } from 'react'
import { match } from 'ts-pattern'
import Sidebar from './sidebar/sidebar'
import Pageinfo from './pageinfo/pageinfo'
import Editor from './editor/editor'
import { ColorTheme, light } from '../jotai-hooks/colorTheme/atom'

const App = () => {
  /*
   * When app is launched, a page is shown. Note this property cannot be undefiend.
   * When no page is available, app will automatically generate a page (untitled page in scratch or an entry of diary).
   * */
  const cache = undefined
  const [selectedPageId, setSelectedPageId] = useState<string>('')

  /*
   * Visibility of sidebar.
   * */
  const [sidebarIsVisible, setSidebarIsVisible] = useState<boolean>(false)

  /*
   * Width of the sidebar in pixel.
   * */
  const [sidebarWidth, setSidebarWidth] = useState<number>(200)

  /*
   * Visibility of pageinfo.
   * */
  const [pageinfoIsVisible, setPageInfoIsVisible] = useState<boolean>(false)

  /*
   * Width of pageinfo in pixel.
   * */
  const [pageinfoWidth, setPageInfoWidth] = useState<number>(200)

  /*
   * Color theme of the app.
   * */
  const [colorTheme, setColorTheme] = useState<ColorTheme>(light)

  /*
   * TODO: Custom theme is not implemented yet.
   *  Note that the custom style sheet doesn't have an information of color theme at all.
   *  This is to separate our concern of styling the superficial color from changing the app structure.
   * */

  /*
   * TODO: Custom keybindings is not implemented yet.
   * */

  /*
   * Module you are working on.
   * 0 → sidebar
   * 1-4 → editor
   * last → pageinfo
   * */
  const [workingModuleIndex, setWorkingModuleIndex] = useState<number>(0)

  /*
   * Current numbers of editor panes.
   * */
  const [currentPaneNums, setCurrentPaneNums] = useState<1 | 2 | 3 | 4>(1)

  /*
   * Register event handlers to switch working module.
   * */
  useEffect(() => {
    const callback = (e: KeyboardEvent): void => {
      match(e.key)
        .with('Tab', () => {
          if (e.ctrlKey) {
            setWorkingModuleIndex((prev) => (prev === currentPaneNums + 1 ? 0 : prev + 1))
          }
        })
        .otherwise(() => console.log(''))
    }
    document.addEventListener('keydown', callback)

    return function cleanup() {
      document.removeEventListener('keydown', callback)
    }
  }, [workingModuleIndex, setWorkingModuleIndex, currentPaneNums])

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: `${colorTheme.background}` }}>
      <Sidebar
        workingModuleIndex={workingModuleIndex}
        sidebarWidth={sidebarWidth}
        sidebarIsVisible={sidebarIsVisible}
      />
      <Editor
        workingModuleIndex={workingModuleIndex}
        sidebarIsVisible={sidebarIsVisible}
        sidebarWidth={sidebarWidth}
        setSidebarIsVisible={setSidebarIsVisible}
        pageinfoIsVisible={pageinfoIsVisible}
        pageinfoWidth={pageinfoWidth}
        setPageInfoIsVisible={setPageInfoIsVisible}
      />
      <Pageinfo
        workingModuleIndex={workingModuleIndex}
        pageinfoIsVisible={pageinfoIsVisible}
        pageinfoWidth={pageinfoWidth}
      />
    </div>
  )
}

export default App
