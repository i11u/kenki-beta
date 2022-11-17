import { useEffect } from 'react'
import { match } from 'ts-pattern'
import { v4 } from 'uuid'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'
import { modeSelectors } from '../../../jotai-hooks/mode/selector'
import { modeActions } from '../../../jotai-hooks/mode/action'
import { blocksActions, useCreateBlock, useMoveBlock, useRemoveBlock } from '../../../jotai-hooks/blocks/action'
import { useMoveCursor, useMoveCursorByPosition } from '../../../jotai-hooks/cursor/action'
import { editorConfigActions } from '../../../jotai-hooks/editorConfig/action'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'
import { colorThemeActions } from '../../../jotai-hooks/colorTheme/action'
import { cursorSelector } from '../../../jotai-hooks/cursor/selector'
import { BlockUtils } from '../../../utils/block'
import { DomUtils } from '../../../utils/dom'
import { relationActions } from '../../../jotai-hooks/relations/action'

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
  const scale = pageConfigSelectors.usePageScale()
  const createRelation = relationActions.useAddRelation()
  const changeAngle = blocksActions.useChangeAngle()

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
      return match(mode)
        .with('CURSOR', () => {
          match(buffer)
            .with('h', () => {
              e.preventDefault()
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
              e.preventDefault()
              if (e.ctrlKey) {
                document.getElementsByClassName('editor')[0]?.scrollBy({
                  top: 100,
                  left: 0,
                  behavior: 'smooth',
                })
                // Scroller.scrollBy('y', 120)
              } else {
                moveCursor({ direction: 'down', offset: 1 })
              }
              buffer = ''
            })
            .with('k', () => {
              e.preventDefault()
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
              e.preventDefault()
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
              e.preventDefault()
              moveCursor({ direction: 'left', offset: 2 })
              buffer = ''
            })
            .with('J', () => {
              e.preventDefault()
              moveCursor({ direction: 'down', offset: 2 })
              buffer = ''
            })
            .with('K', () => {
              e.preventDefault()
              moveCursor({ direction: 'up', offset: 2 })
              buffer = ''
            })
            .with('L', () => {
              e.preventDefault()
              moveCursor({ direction: 'right', offset: 2 })
              buffer = ''
            })
            .with('+', () => {
              e.preventDefault()
              changeScale(currentScale + 0.1)
              buffer = ''
            })
            .with('-', () => {
              e.preventDefault()
              changeScale(currentScale - 0.1)
              buffer = ''
            })
            .with('g', () => {
              e.preventDefault()
              toggleGridIsVisible()
              buffer = ''
            })
            .with('t', () => {
              e.preventDefault()
              createBlock(BlockUtils.emptyBlock({ position: cursorPosition }))
              changeMode('TEXT')
              buffer = ''
            })
            .with('f', () => {
              e.preventDefault()
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
                hint.style.marginTop = `${-20 + blockDOM.getBoundingClientRect().top / scale}px`
                hint.style.marginLeft = `${-20 + blockDOM.getBoundingClientRect().left / scale}px`
                hint.style.border = '1px solid gray'
                hint.style.borderRadius = '2px'
                hint.style.fontFamily = 'Monaco, sans-serif'
                hint.style.fontSize = 'auto'
                hint.style.textAlign = 'center'
                hint.style.zIndex = '100'
                return hint
              })
              hints.map((hint) => (document.getElementsByClassName(`editor-page`)[0] as HTMLElement).appendChild(hint))
              buffer = ''
            })
            .with('v', () => {
              e.preventDefault()
              toggleBlockBorderIsVisible()
              buffer = ''
            })
            .otherwise(() => {
              buffer = ''
            })
        })
        .with('TEXT', () => {
          match(e.key)
            .with('Escape', () => {
              moveCursorByPosition({
                row: (editingBlock?.position.row as number) + (editingBlock?.height as number) - 1,
                col: (editingBlock?.position.col as number) + (editingBlock?.width as number) - 1,
              })
              changeBlockStatus({
                blockId: editingBlockId as string,
                isEmpty: false,
                isSelected: false,
                editing: false,
              })
              changeMode('CURSOR')
              buffer = ''
            })
            .with('l', () => {
              if (e.shiftKey && e.metaKey) {
                e.preventDefault()
                toggleColorTheme()
              }
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
          const selectedBlock = selectedBlocks[0]
          match(buffer)
            .with('Escape', () => {
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
            .with('h', () => {
              e.preventDefault()
              moveBlock({ blockId: selectedBlocks[0].id, direction: 'left', offset: 1 })
              buffer = ''
            })
            .with('j', () => {
              e.preventDefault()
              moveBlock({ blockId: selectedBlocks[0].id, direction: 'down', offset: 1 })
              buffer = ''
            })
            .with('k', () => {
              e.preventDefault()
              moveBlock({ blockId: selectedBlocks[0].id, direction: 'up', offset: 1 })
              buffer = ''
            })
            .with('l', () => {
              e.preventDefault()
              if (e.shiftKey && e.metaKey) {
                toggleColorTheme()
              } else {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'right', offset: 1 })
              }
              buffer = ''
            })
            .with('H', () => {
              e.preventDefault()
              moveBlock({ blockId: selectedBlocks[0].id, direction: 'left', offset: 2 })
              buffer = ''
            })
            .with('J', () => {
              e.preventDefault()
              moveBlock({ blockId: selectedBlocks[0].id, direction: 'down', offset: 2 })
              buffer = ''
            })
            .with('K', () => {
              e.preventDefault()
              moveBlock({ blockId: selectedBlocks[0].id, direction: 'up', offset: 2 })
              buffer = ''
            })
            .with('L', () => {
              e.preventDefault()
              moveBlock({ blockId: selectedBlocks[0].id, direction: 'right', offset: 2 })
              buffer = ''
            })
            .with('+', () => {
              e.preventDefault()
              changeScale(currentScale + 0.1)
              buffer = ''
            })
            .with('-', () => {
              e.preventDefault()
              changeScale(currentScale - 0.1)
              buffer = ''
            })
            .with('g', () => {
              e.preventDefault()
              toggleGridIsVisible()
              buffer = ''
            })
            .with('v', () => {
              e.preventDefault()
              toggleBlockBorderIsVisible()
              buffer = ''
            })
            .with('r', () => {
              e.preventDefault()
              if (e.ctrlKey) {
                changeAngle({ blockId: selectedBlocks[0].id, angle: selectedBlocks[0].angle - 15 })
              } else {
                changeAngle({ blockId: selectedBlocks[0].id, angle: selectedBlocks[0].angle + 15 })
              }
            })
            .with('Tab', () => {
              if (e.shiftKey) {
                e.preventDefault()
                // const startBlock = selectedBlocks[0]
                // changeBlockStatus({
                //   blockId: startBlock.id,
                //   isEmpty: false,
                //   isSelected: false,
                //   editing: false,
                // })
                // changeMode('BLOCKHINT')
                // //  Activate block hints
                // const blockDOMs = Array.from(document.getElementsByClassName('block-wrapper'))
                // const labels = hintStrings(blockDOMs.length)
                // const hints = blockDOMs.map((blockDOM, i) => {
                //   const hint = document.createElement('div')
                //   hint.id = blockDOM.id.slice(6, -8)
                //   hint.className = `hint ${labels[i]}`
                //   hint.innerHTML = labels[i]
                //   hint.style.color = 'black'
                //   hint.style.position = 'absolute'
                //   hint.style.backgroundColor = '#ffdf5e'
                //   const cellWidth = document.getElementById('cursor')?.clientWidth as number
                //   const cellHeight = document.getElementById('cursor')?.clientHeight as number
                //   hint.style.width = `calc(${cellWidth}px + ${cellWidth * (labels[i].length - 1) * 0.5}px)`
                //   hint.style.height = `${cellHeight}px`
                //   hint.style.marginTop = '-20px'
                //   hint.style.marginLeft = '-20px'
                //   hint.style.border = '1px solid gray'
                //   hint.style.borderRadius = '2px'
                //   hint.style.fontFamily = 'Monaco, sans-serif'
                //   hint.style.fontSize = 'auto'
                //   hint.style.textAlign = 'center'
                //   return hint
                // })
                // hints.map((hint) =>
                //   (document.getElementById(`block-${hint.id}-wrapper`) as HTMLElement).appendChild(hint)
                // )
                // buffer = ''
                // // If buffer hits any hint, flag becomes true
                // let noMatch = true
                // hints.map((hint) => {
                //   const reg1 = new RegExp(`^${buffer}`)
                //   const reg2 = new RegExp(`^${hint.className.slice(5)}$`)
                //   if (reg1.test(hint.className.slice(5))) {
                //     noMatch = false
                //     if (reg2.test(buffer)) {
                //       createRelation({
                //         relation: {
                //           id: v4(),
                //           orient: 'outward',
                //           type: 'thick',
                //           startBlockId: startBlock.id,
                //           endBlockId: hint.id,
                //           isSelected: true,
                //           editing: true,
                //           label: '',
                //           scale,
                //         },
                //       })
                //       DomUtils.removeElements(document.getElementsByClassName('hint'))
                //       buffer = ''
                //     } else {
                //       // eslint-disable-next-line no-param-reassign
                //       hint.innerHTML = `<span style="color: red">${buffer}</span>${hint.className
                //         .slice(5)
                //         .slice(buffer.length)}`
                //     }
                //   } else {
                //     hint.remove()
                //   }
                //   return false
                // })
                // if (noMatch) {
                //   DomUtils.removeElements(document.getElementsByClassName('hint'))
                //   changeMode('CURSOR')
                //   buffer = ''
                //   return false
                // }
              } else {
                const startBlock = selectedBlocks[0]
                changeBlockStatus({
                  blockId: startBlock.id,
                  isEmpty: false,
                  isSelected: false,
                  editing: false,
                })
                const endBlock = BlockUtils.composeBlock(
                  v4(),
                  0,
                  {
                    row: startBlock.position.row + startBlock.height / 2 - 0.5,
                    col: startBlock.position.col + startBlock.width + 3,
                  },
                  1,
                  1,
                  null,
                  true,
                  false,
                  false,
                  '',
                  '',
                  0
                )
                createBlock(endBlock)
                createRelation({
                  relation: {
                    id: v4(),
                    orient: 'outward',
                    type: 'thick',
                    startBlockId: startBlock.id,
                    endBlockId: endBlock.id,
                    isSelected: true,
                    editing: true,
                    label: '',
                    scale,
                  },
                })
              }
              return console.log('')
            })
            .with('Backspace', () => {
              const block = selectedBlocks[0]
              // document.getElementById(`block-${block.id}`)?.remove()
              removeBlock(block.id)
              moveCursorByPosition(block.position)
              changeMode('CURSOR')
              buffer = ''
            })
            .otherwise(() => {
              buffer = ''
            })
        })
        .with('BLOCKHINT', () => {
          match(e.key)
            .with('Escape', () => {
              DomUtils.removeElements(document.getElementsByClassName('hint'))
              changeMode('CURSOR')
              buffer = ''
            })
            .with('Shift', () => {
              buffer = ''
            })
            .with('Control', () => {
              buffer = ''
            })
            // eslint-disable-next-line consistent-return
            .with('h', () => {
              if (e.ctrlKey) {
                document.getElementsByClassName('editor')[0]?.scrollBy({
                  top: 0,
                  left: -100,
                  behavior: 'smooth',
                })
              } else {
                const hints = Array.from(document.getElementsByClassName('hint'))
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
              }
              buffer = ''
            })
            // eslint-disable-next-line consistent-return
            .with('j', () => {
              e.preventDefault()
              if (e.ctrlKey) {
                document.getElementsByClassName('editor')[0]?.scrollBy({
                  top: 100,
                  left: 0,
                  behavior: 'smooth',
                })
              } else {
                const hints = Array.from(document.getElementsByClassName('hint'))
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
              }
              buffer = ''
            })
            // eslint-disable-next-line consistent-return
            .with('k', () => {
              e.preventDefault()
              if (e.ctrlKey) {
                document.getElementsByClassName('editor')[0]?.scrollBy({
                  top: -100,
                  left: 0,
                  behavior: 'smooth',
                })
              } else {
                const hints = Array.from(document.getElementsByClassName('hint'))
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
              }
              buffer = ''
            })
            // eslint-disable-next-line consistent-return
            .with('l', () => {
              e.preventDefault()
              if (e.ctrlKey) {
                document.getElementsByClassName('editor')[0]?.scrollBy({
                  top: 0,
                  left: 100,
                  behavior: 'smooth',
                })
              } else {
                const hints = Array.from(document.getElementsByClassName('hint'))
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
              }
              buffer = ''
            })
            .with('+', () => {
              e.preventDefault()
              changeScale(currentScale + 0.1)
              buffer = ''
            })
            .with('-', () => {
              e.preventDefault()
              changeScale(currentScale - 0.1)
              buffer = ''
            })
            .otherwise(() => {
              if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) {
                buffer = ''
              }
              const hints = Array.from(document.getElementsByClassName('hint'))
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
    scale,
    createRelation,
    changeAngle,
  ])
}

export default useKeydownHandler
