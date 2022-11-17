import { useEffect } from 'react'
import { match } from 'ts-pattern'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'
import { modeSelectors } from '../../../jotai-hooks/mode/selector'
import { modeActions } from '../../../jotai-hooks/mode/action'
import {
  blocksActions,
  Direction,
  useCreateBlock,
  useMoveBlock,
  useRemoveBlock,
} from '../../../jotai-hooks/blocks/action'
import { useMoveCursor, useMoveCursorByPosition } from '../../../jotai-hooks/cursor/action'
import { editorConfigActions } from '../../../jotai-hooks/editorConfig/action'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'
import { colorThemeActions } from '../../../jotai-hooks/colorTheme/action'
import { cursorSelector } from '../../../jotai-hooks/cursor/selector'
import { BlockUtils } from '../../../apis/block'
import { DomUtils } from '../../../apis/dom'

const useKeydownHandler = () => {
  const editingBlockId = blockSelectors.useEditingBlockId()
  const editingBlock = blockSelectors.useEditingBlock()
  const selectedBlocks = blockSelectors.useSelectedBlocks()
  const mode = modeSelectors.useCurrentMode()
  const changeMode = modeActions.useSwitchModes()
  const moveCursor = useMoveCursor()
  const moveBlock = useMoveBlock()
  const createBlock = useCreateBlock()
  const cursorPosition = cursorSelector.useCursorPosition()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const moveCursorByPosition = useMoveCursorByPosition()
  const gridNum = pageConfigSelectors.useGridNum()
  const toggleSidebar = editorConfigActions.useToggleSidebarLeft()
  const currentScale = pageConfigSelectors.usePageScale()
  const changeScale = pageConfigActions.useChangeScale()
  const toggleSidebarRight = editorConfigActions.useToggleSidebarRight()
  const removeBlock = useRemoveBlock()
  const toggleColorTheme = colorThemeActions.useToggleColorTheme()
  const toggleGridIsVisible = pageConfigActions.useToggleGridIsVisible()
  const toggleBlockBorderIsVisible = pageConfigActions.useToggleBlockBorderIsVisible()
  const toggleSeparationIsVisible = editorConfigActions.useToggleSeparationIsVisible()
  const editingTitle = pageConfigSelectors.useEditingTitle()

  const linkHintCharacters = 'sadfjklewcmpgh'

  const hintStrings = (linkCount: number) => {
    let hints = ['']
    let offset = 0
    while (hints.length - offset < linkCount || hints.length === 1) {
      // eslint-disable-next-line no-plusplus
      const hint = hints[offset++]
      // eslint-disable-next-line no-restricted-syntax
      for (const ch of linkHintCharacters) {
        hints.push(ch + hint)
      }
    }
    hints = hints.slice(offset, offset + linkCount)
    return hints.sort().map((str) =>
      str
        .split('')
        .reverse()
        .reduce((prev, curr) => prev + curr, '')
    )
  }

  useEffect(() => {
    let buffer = ''
    const callback = (e: KeyboardEvent): void => {
      buffer += e.key
      return (
        match(mode)
          .with('CURSOR', () => {
            e.preventDefault()
            console.log(buffer)
            if (editingTitle) return
            match(buffer)
              .with('h', () => {
                if (e.ctrlKey) {
                  document.getElementsByClassName('editor')[0]?.scrollBy({
                    top: 0,
                    left: -100,
                    behavior: 'smooth',
                  })
                } else {
                  moveCursor({ direction: 'left', offset: 1 })
                }
                buffer = ''
              })
              .with('j', () => {
                if (e.ctrlKey) {
                  document.getElementsByClassName('editor')[0]?.scrollBy({
                    top: 100,
                    left: 0,
                    behavior: 'smooth',
                  })
                } else {
                  moveCursor({ direction: 'down', offset: 1 })
                }
                buffer = ''
              })
              .with('k', () => {
                if (e.ctrlKey) {
                  document.getElementsByClassName('editor')[0]?.scrollBy({
                    top: -100,
                    left: 0,
                    behavior: 'smooth',
                  })
                } else {
                  moveCursor({ direction: 'up', offset: 1 })
                }
                buffer = ''
              })
              .with('l', () => {
                if (e.shiftKey && e.metaKey) {
                  toggleColorTheme()
                } else if (e.ctrlKey) {
                  document.getElementsByClassName('editor')[0]?.scrollBy({
                    top: 0,
                    left: 100,
                    behavior: 'smooth',
                  })
                } else {
                  moveCursor({ direction: 'right', offset: 1 })
                }
                buffer = ''
              })
              .with('H', () => {
                moveCursor({ direction: 'left', offset: 2 })
                buffer = ''
              })
              .with('J', () => {
                moveCursor({ direction: 'down', offset: 2 })
                buffer = ''
              })
              .with('K', () => {
                moveCursor({ direction: 'up', offset: 2 })
                buffer = ''
              })
              .with('L', () => {
                moveCursor({ direction: 'right', offset: 2 })
                buffer = ''
              })
              .with('+', () => {
                changeScale(currentScale + 0.1)
                buffer = ''
              })
              .with('-', () => {
                changeScale(currentScale - 0.1)
                buffer = ''
              })
              .with('g', () => {
                toggleGridIsVisible()
                buffer = ''
              })
              .with('t', () => {
                createBlock(BlockUtils.emptyBlock({ position: cursorPosition }))
                changeMode('TEXT')
                buffer = ''
              })
              .with('f', () => {
                changeMode('BLOCKHINT')
                //  Activate block hints
                const blockDOMs = Array.from(document.getElementsByClassName('block-wrapper'))
                const labels = hintStrings(blockDOMs.length)
                const hints = blockDOMs.map((blockDOM, i) => {
                  const hint = document.createElement('div')
                  hint.id = blockDOM.id.slice(6, -8)
                  hint.className = `hint ${labels[i]}`
                  hint.innerHTML = labels[i]
                  hint.style.color = 'black'
                  hint.style.position = 'absolute'
                  hint.style.backgroundColor = '#ffdf5e'
                  const cellWidth = document.getElementById('cursor')?.clientWidth as number
                  const cellHeight = document.getElementById('cursor')?.clientHeight as number
                  hint.style.width = `calc(${cellWidth}px + ${cellWidth * (labels[i].length - 1) * 0.5}px)`
                  hint.style.height = `${cellHeight}px`
                  hint.style.marginTop = `${-20 + blockDOM.getBoundingClientRect().top}px`
                  hint.style.marginLeft = `${-20 + blockDOM.getBoundingClientRect().left}px`
                  hint.style.border = '1px solid gray'
                  hint.style.borderRadius = '2px'
                  hint.style.fontFamily = 'Monaco, sans-serif'
                  hint.style.fontSize = 'auto'
                  hint.style.textAlign = 'center'
                  hint.style.zIndex = '100'
                  return hint
                })
                hints.map((hint) =>
                  (document.getElementsByClassName(`editor-page`)[0] as HTMLElement).appendChild(hint)
                )
                buffer = ''
              })
              .with('v', () => {
                if (e.shiftKey && e.metaKey) {
                  toggleBlockBorderIsVisible()
                }
                buffer = ''
              })
              .with(',', () => {
                if (e.metaKey) {
                  changeMode('SETTINGS')
                  toggleSidebarRight()
                }
                buffer = ''
              })
              .with('.', () => {
                if (e.metaKey) {
                  changeMode('HELP')
                  toggleSidebarRight()
                }
                buffer = ''
              })
              .otherwise(() => {
                // if (document.getElementById('shadowContainer')) {
                //   DomUtils.removeElement(document.getElementById('shadowContainer') as HTMLDivElement)
                // }
                // if (/^\d+$/.test(buffer)) {
                //   const cursorDOM = document.getElementById('cursor') as HTMLDivElement
                //   const offset = Number(buffer)
                //   const cellWidth = 100 / gridNum.colNum
                //   const cellHeight = 100 / gridNum.rowNum
                //   const directions: Direction[] = ['left', 'down', 'up', 'right']
                //   const shadows = directions.map((direction) => {
                //     const shadow = cursorDOM.cloneNode(true) as HTMLDivElement
                //     shadow.id = ''
                //     shadow.style.position = 'absolute'
                //     shadow.style.opacity = '0.2'
                //     match(direction)
                //       .with('left', () => {
                //         shadow.style.left = `${cellWidth * (cursorPosition.col - offset)}%`
                //       })
                //       .with('down', () => {
                //         shadow.style.top = `${cellHeight * (cursorPosition.row + offset)}%`
                //       })
                //       .with('up', () => {
                //         shadow.style.top = `${cellHeight * (cursorPosition.row - offset)}%`
                //       })
                //       .with('right', () => {
                //         shadow.style.left = `${cellWidth * (cursorPosition.col + offset)}%`
                //       })
                //       .exhaustive()
                //     return shadow
                //   })
                //   const shadowContainerDiv = DomUtils.addElementList(
                //     shadows,
                //     document.getElementById('page') as HTMLElement,
                //     {
                //       id: 'shadowContainer',
                //       className: '',
                //     }
                //   )
                // } else if (/^\d+h$/g.test(buffer)) {
                //   const offset = Number(buffer.slice(0, -1))
                //   moveCursor({ direction: 'left', offset })
                //   buffer = ''
                // } else if (/^\d+j$/g.test(buffer)) {
                //   const offset = Number(buffer.slice(0, -1))
                //   moveCursor({ direction: 'down', offset })
                //   buffer = ''
                // } else if (/^\d+k$/g.test(buffer)) {
                //   const offset = Number(buffer.slice(0, -1))
                //   moveCursor({ direction: 'up', offset })
                //   buffer = ''
                // } else if (/^\d+l$/g.test(buffer)) {
                //   const offset = Number(buffer.slice(0, -1))
                //   moveCursor({ direction: 'right', offset })
                //   buffer = ''
                // } else {
                buffer = ''
                // }
              })
          })
          .with('INSERT', () =>
            match(buffer)
              .with('Escape', () => {
                toggleSidebar()
                changeMode('SELECT')
                buffer = ''
              })
              .with('Enter', () => {
                buffer = ''
              })
              .with('l', () => {
                if (e.shiftKey && e.metaKey) {
                  toggleColorTheme()
                }
                buffer = ''
              })
              .otherwise(() => {
                buffer = ''
              })
          )
          // .with('COMMAND', () =>
          //   match(buffer)
          //     .with('Escape', () => {
          //       changeMode('CURSOR')
          //       buffer = ''
          //     })
          //     .with('l', () => {
          //       if (e.shiftKey && e.metaKey) {
          //         toggleColorTheme()
          //       }
          //       buffer = ''
          //     })
          //     //  In COMMAND mode, keystrokes are handled by listeners defined in each component.
          //     .otherwise(() => {
          //       buffer = ''
          //     })
          // )
          .with('TEXT', () => {
            match(e.key)
              .with('Escape', () => {
                changeMode('CURSOR')
                changeBlockStatus({
                  blockId: editingBlockId as string,
                  isEmpty: false,
                  isSelected: false,
                  editing: false,
                })
                buffer = ''
              })
              .with('v', () => {
                if (e.ctrlKey) {
                  e.preventDefault()
                  changeBlockStatus({
                    blockId: editingBlockId as string,
                    isEmpty: false,
                    isSelected: true,
                    editing: false,
                  })
                  changeMode('SELECT')
                }
                buffer = ''
              })
              .otherwise(() => {
                buffer = ''
              })
          })
          .with('SELECT', () => {
            match(buffer)
              .with('Escape', () => {
                const selectedBlock = selectedBlocks[0]
                changeBlockStatus({
                  blockId: selectedBlocks[0].id,
                  isEmpty: false,
                  isSelected: false,
                  editing: false,
                })
                moveCursorByPosition({
                  row: selectedBlock.position.row + selectedBlock.height - 1,
                  col: selectedBlock.position.col + selectedBlock.width - 1,
                })
                changeMode('CURSOR')
                buffer = ''
              })
              .with('i', () => {
                changeBlockStatus({
                  blockId: selectedBlocks[0].id,
                  isEmpty: false,
                  isSelected: false,
                  editing: true,
                })
                changeMode('TEXT')
                buffer = ''
              })
              //  selectedBlockId is known to exist when entering SELECT mode.
              .with('h', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'left', offset: 1 })
                buffer = ''
              })
              .with('j', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'down', offset: 1 })
                buffer = ''
              })
              .with('k', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'up', offset: 1 })
                buffer = ''
              })
              .with('l', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'right', offset: 1 })
                buffer = ''
              })
              .with('H', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'left', offset: 2 })
                buffer = ''
              })
              .with('J', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'down', offset: 2 })
                buffer = ''
              })
              .with('K', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'up', offset: 2 })
                buffer = ''
              })
              .with('L', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'right', offset: 2 })
                buffer = ''
              })
              .with('r', () => {
                if (e.ctrlKey) {
                  changeMode('INSERT')
                  toggleSidebar()
                  buffer = ''
                }
                e.preventDefault()
                buffer = ''
              })
              .with('Backspace', () => {
                const block = selectedBlocks[0]
                // document.getElementById(`block-${block.id}`)?.remove()
                removeBlock(block.id)
                moveCursorByPosition(block.position)
                changeMode('CURSOR')
                buffer = ''
              })
              .with('l', () => {
                if (e.shiftKey && e.metaKey) {
                  toggleColorTheme()
                }
                buffer = ''
              })
              .with('Tab', () => {
                e.preventDefault()
                buffer = ''
              })
              .otherwise(() => {
                if (document.getElementById('shadowContainer')) {
                  DomUtils.removeElement(document.getElementById('shadowContainer') as HTMLDivElement)
                }
                if (/^\d+$/.test(buffer)) {
                  const blockDOM = document.getElementById(`block-${selectedBlocks[0].id}-wrapper`) as HTMLDivElement
                  const offset = Number(buffer)
                  const cellWidth = 100 / gridNum.colNum
                  const cellHeight = 100 / gridNum.rowNum
                  const directions: Direction[] = ['left', 'down', 'up', 'right']
                  const shadows = directions.map((direction) => {
                    const shadow = blockDOM.cloneNode(true) as HTMLDivElement
                    shadow.id = ''
                    shadow.style.position = 'absolute'
                    shadow.style.opacity = '0.2'
                    shadow.style.backgroundColor = 'cornflowerblue'
                    match(direction)
                      .with('left', () => {
                        shadow.style.left = `${cellWidth * (selectedBlocks[0].position.col - offset)}%`
                      })
                      .with('down', () => {
                        shadow.style.top = `${cellHeight * (selectedBlocks[0].position.row + offset)}%`
                      })
                      .with('up', () => {
                        shadow.style.top = `${cellHeight * (selectedBlocks[0].position.row - offset)}%`
                      })
                      .with('right', () => {
                        shadow.style.left = `${cellWidth * (selectedBlocks[0].position.col + offset)}%`
                      })
                      .exhaustive()
                    return shadow
                  })
                  const shadowContainerDiv = DomUtils.addElementList(
                    shadows,
                    document.getElementById('page') as HTMLElement,
                    {
                      id: 'shadowContainer',
                      className: '',
                    }
                  )
                  // } else if (/^\d+h$/g.test(buffer)) {
                  //   const offset = Number(buffer.slice(0, -1))
                  //   moveBlock({ blockId: selectedBlocks[0].id, direction: 'left', offset })
                  //   buffer = ''
                  // } else if (/^\d+j$/g.test(buffer)) {
                  //   const offset = Number(buffer.slice(0, -1))
                  //   moveBlock({ blockId: selectedBlocks[0].id, direction: 'down', offset })
                  //   buffer = ''
                  // } else if (/^\d+k$/g.test(buffer)) {
                  //   const offset = Number(buffer.slice(0, -1))
                  //   moveBlock({ blockId: selectedBlocks[0].id, direction: 'up', offset })
                  //   buffer = ''
                  // } else if (/^\d+l$/g.test(buffer)) {
                  //   const offset = Number(buffer.slice(0, -1))
                  //   moveBlock({ blockId: selectedBlocks[0].id, direction: 'right', offset })
                  //   buffer = ''
                } else {
                  e.preventDefault()
                  buffer = ''
                }
              })
          })
          .with('BLOCKHINT', () => {
            match(e.key)
              .with('Escape', () => {
                DomUtils.removeElements(document.getElementsByClassName('hint'))
                changeMode('CURSOR')
                buffer = ''
              })
              .otherwise(() => {
                const hints = Array.from(document.getElementsByClassName('hint'))
                console.log(buffer)
                // If buffer hits any hint, flag becomes true
                let noMatch = true
                hints.map((hint) => {
                  const reg1 = new RegExp(`^${buffer}`)
                  const reg2 = new RegExp(`^${hint.className.slice(5)}$`)
                  if (reg1.test(hint.className.slice(5))) {
                    noMatch = false
                    if (reg2.test(buffer)) {
                      changeBlockStatus({
                        blockId: hint.id,
                        isEmpty: false,
                        isSelected: true,
                        editing: false,
                      })
                      selectedBlocks.forEach((block) => {
                        if (block.id !== hint.id) {
                          changeBlockStatus({
                            blockId: block.id,
                            isEmpty: block.isEmpty,
                            isSelected: false,
                            editing: false,
                          })
                        }
                      })
                      DomUtils.removeElements(document.getElementsByClassName('hint'))
                      changeMode('SELECT')
                      buffer = ''
                    } else {
                      // eslint-disable-next-line no-param-reassign
                      hint.innerHTML = `<span style="color: red">${buffer}</span>${hint.className
                        .slice(5)
                        .slice(buffer.length)}`
                    }
                  } else {
                    hint.remove()
                  }
                  return false
                })
                if (noMatch) {
                  DomUtils.removeElements(document.getElementsByClassName('hint'))
                  changeMode('CURSOR')
                  buffer = ''
                  return false
                }
                return false
              })
          })
          .otherwise(() => console.log('a'))
      )
    }
    document.addEventListener('keydown', callback)

    return function cleanup() {
      document.removeEventListener('keydown', callback)
    }
  }, [
    mode,
    changeMode,
    moveBlock,
    editingBlockId,
    moveCursor,
    createBlock,
    cursorPosition,
    changeBlockStatus,
    editingBlock,
    moveCursorByPosition,
    gridNum,
    toggleSidebar,
    selectedBlocks,
    changeScale,
    currentScale,
    toggleSidebarRight,
    removeBlock,
    toggleColorTheme,
    toggleGridIsVisible,
    toggleBlockBorderIsVisible,
    toggleSeparationIsVisible,
    editingTitle,
  ])
}

export default useKeydownHandler
