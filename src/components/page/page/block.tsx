import styled from 'styled-components'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PrimitiveAtom, useAtomValue } from 'jotai'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
// eslint-disable-next-line import/no-extraneous-dependencies
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
// eslint-disable-next-line import/no-extraneous-dependencies
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
// eslint-disable-next-line import/no-extraneous-dependencies
import { ListItemNode, ListNode } from '@lexical/list'
// eslint-disable-next-line import/no-extraneous-dependencies
import { CodeHighlightNode, CodeNode } from '@lexical/code'
// eslint-disable-next-line import/no-extraneous-dependencies
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { match } from 'ts-pattern'
import { v4 } from 'uuid'
import { BlockUtils } from '../../../utils/block'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'
import { blocksActions, useRemoveBlock, useUpdateInnerHTML } from '../../../jotai-hooks/blocks/action'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { Block, Position } from '../../../jotai-hooks/blocks/atom'
import { modeSelectors } from '../../../jotai-hooks/mode/selector'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import { modeActions } from '../../../jotai-hooks/mode/action'
import TextBlock from '../../editor/textBlock/textBlock'
import Theme from '../../editor/textBlock/themes/theme'
import { relationActions } from '../../../jotai-hooks/relations/action'

const StyledBlockSelection = styled.div`
  position: absolute;
  background-color: cornflowerblue;
  opacity: 0.3;
  z-index: 3;
`

const StyledBlockWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
`

const editorConfig = {
  // namespace
  namespace: 'editor',
  // The editor theme
  theme: Theme,
  // Handling of errors during update
  onError(error: any) {
    throw error
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
}

const BlockTSX = ({ blockAtom }: { blockAtom: PrimitiveAtom<Block> }) => {
  const block = useAtomValue(blockAtom)
  const nextBlock = {
    id: blockSelectors.useNextBlockId(block.id),
    isEmpty: blockSelectors.useNextBlockIsEmpty(block.id),
  }
  const changeBlockSize = blocksActions.useChangeBlockSize()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const addBlock = blocksActions.useAddBlock()
  const blockRef = useRef<HTMLDivElement>(null)
  const innerHTMLRef = useRef(block.defaultInnerHTML)
  const gridNum = pageConfigSelectors.useGridNum()
  const changeScale = pageConfigActions.useChangeScale()
  const mode = modeSelectors.useCurrentMode()
  const colorTheme = colorThemeSelector.useColorTheme()
  const [previousPosition, setPreviousPosition] = useState<Position>(block.position)
  const updateInnerHTML = useUpdateInnerHTML()
  const removeBlock = useRemoveBlock()
  const [defaultValue, setDefaultValue] = useState(block.defaultInnerHTML)
  const changeMode = modeActions.useSwitchModes()
  const scale = pageConfigSelectors.usePageScale()

  const [optionKeyIsPressed, setOptionKeyIsPressed] = useState(false)
  const changeAngle = blocksActions.useChangeAngle()

  const selectedBlocks = blockSelectors.useSelectedBlocks()
  const createBlock = blocksActions.useAddBlock()
  const createRelation = relationActions.useAddRelation()

  useLayoutEffect(() => {
    if (block.width === 1) {
      changeBlockSize({ blockId: block.id, width: 5, height: 1 })
    }
  }, [block.id, block.width, changeBlockSize])

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
    const buffer = ''
    const keydownCallback = (e: KeyboardEvent) => {
      console.log(optionKeyIsPressed)
      if (!block.editing && !block.isSelected) return
      if (mode === 'SELECT') return
      if (optionKeyIsPressed) {
        const textBlock = document.getElementById(`block-${block.id}`) as HTMLDivElement
        setTimeout(() => textBlock.blur(), 0)
        e.preventDefault()
        match(e.code)
          .with('KeyH', () => {
            e.preventDefault()
            if (e.shiftKey) {
              changeBlockPosition({
                blockId: block.id,
                position: { col: block.position.col - 2, row: block.position.row },
              })
            } else if (e.ctrlKey) {
              document.getElementsByClassName('editor')[0]?.scrollBy({
                top: 0,
                left: -100,
                behavior: 'smooth',
              })
            } else {
              changeBlockPosition({
                blockId: block.id,
                position: { col: block.position.col - 1, row: block.position.row },
              })
            }
          })
          .with('KeyJ', () => {
            e.preventDefault()
            if (e.shiftKey) {
              changeBlockPosition({
                blockId: block.id,
                position: { col: block.position.col, row: block.position.row + 2 },
              })
            } else if (e.ctrlKey) {
              document.getElementsByClassName('editor')[0]?.scrollBy({
                top: 100,
                left: 0,
                behavior: 'smooth',
              })
            } else {
              changeBlockPosition({
                blockId: block.id,
                position: { col: block.position.col, row: block.position.row + 1 },
              })
            }
          })
          .with('KeyK', () => {
            e.preventDefault()
            if (e.shiftKey) {
              changeBlockPosition({
                blockId: block.id,
                position: { col: block.position.col, row: block.position.row - 2 },
              })
            } else if (e.ctrlKey) {
              document.getElementsByClassName('editor')[0]?.scrollBy({
                top: -100,
                left: 0,
                behavior: 'smooth',
              })
            } else {
              changeBlockPosition({
                blockId: block.id,
                position: { col: block.position.col, row: block.position.row - 1 },
              })
            }
          })
          .with('KeyL', () => {
            e.preventDefault()
            if (e.shiftKey) {
              changeBlockPosition({
                blockId: block.id,
                position: { col: block.position.col + 2, row: block.position.row },
              })
            } else if (e.ctrlKey) {
              document.getElementsByClassName('editor')[0]?.scrollBy({
                top: 0,
                left: 100,
                behavior: 'smooth',
              })
            } else {
              changeBlockPosition({
                blockId: block.id,
                position: { col: block.position.col + 1, row: block.position.row },
              })
            }
          })
          .with('KeyR', () => {
            e.preventDefault()
            if (e.ctrlKey) {
              changeAngle({ blockId: block.id, angle: block.angle - 15 })
            } else {
              changeAngle({ blockId: block.id, angle: block.angle + 15 })
            }
          })
          // .with('BracketRight', () => {
          //   e.preventDefault()
          //   if (block.width === 2) return
          //   const textBlock = document.getElementById(`block-${block.id}`) as HTMLDivElement
          //   textBlock.style.whiteSpace = 'normal'
          //   textBlock.style.overflowWrap = 'break-word'
          //   changeBlockSize({
          //     blockId: block.id,
          //     width: block.width - 1,
          //     height: block.height,
          //   })
          //   textBlock.style.width = `${(block.width - 1) * 30}px`
          // })
          // .with('Backslash', () => {
          //   e.preventDefault()
          //   const textBlock = document.getElementById(`block-${block.id}`) as HTMLDivElement
          //   textBlock.style.whiteSpace = 'normal'
          //   textBlock.style.overflowWrap = 'break-word'
          //   changeBlockSize({
          //     blockId: block.id,
          //     width: block.width + 1,
          //     height: block.height,
          //   })
          //   textBlock.style.width = `${(block.width + 1) * 30}px`
          // })
          .with('Tab', () => {
            setOptionKeyIsPressed(false)
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
              createBlock({ block: endBlock })
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
          .otherwise(() => console.log(''))
      } else {
        match(e.key)
          .with('Alt', () => {
            setOptionKeyIsPressed(true)
            const textBlock = document.getElementById(`block-${block.id}`) as HTMLDivElement
            setTimeout(() => textBlock.blur(), 0)
            changeBlockStatus({
              blockId: block.id,
              isEmpty: false,
              isSelected: true,
              editing: false,
            })
          })
          .otherwise(() => console.log(''))
      }
    }

    const keyupCallback = (e: KeyboardEvent) => {
      if (!block.editing && !block.isSelected) return
      if (optionKeyIsPressed) {
        match(e.key)
          .with('Alt', () => {
            setOptionKeyIsPressed(false)
            changeBlockStatus({
              blockId: block.id,
              isEmpty: false,
              isSelected: false,
              editing: true,
            })
          })
          .otherwise(() => console.log(''))
        const textBlock = document.getElementById(`block-${block.id}`) as HTMLDivElement
        textBlock.focus()
      } else {
        console.log('')
      }
    }
    document.addEventListener('keydown', keydownCallback)
    document.addEventListener('keyup', keyupCallback)
    return function cleanup() {
      document.removeEventListener('keydown', keydownCallback)
      document.removeEventListener('keyup', keyupCallback)
    }
  }, [
    block.angle,
    block.editing,
    block.height,
    block.id,
    block.isSelected,
    block.position.col,
    block.position.row,
    block.width,
    changeAngle,
    changeBlockPosition,
    changeBlockSize,
    changeBlockStatus,
    changeMode,
    createBlock,
    createRelation,
    mode,
    optionKeyIsPressed,
    scale,
    selectedBlocks,
    setOptionKeyIsPressed,
  ])

  /*
   * Auto focus on the text node if being edited.
   * */
  useEffect(() => {
    const textBlock = document.getElementById(`block-${block.id}`) as HTMLDivElement
    if (block.editing) {
      setTimeout(() => textBlock.focus(), 0)
    } else {
      setTimeout(() => textBlock.blur(), 0)
    }
  }, [block, block.editing, block.id])

  useEffect(() => {
    if (
      mode === 'CURSOR' &&
      !block.isSelected &&
      !block.editing &&
      block.defaultInnerHTML === '' &&
      block.innerHTML === ''
    ) {
      removeBlock(block.id)
    }
  }, [block, mode, removeBlock])

  /*
   * Update previousPosition
   * */
  useEffect(() => setPreviousPosition(block.position), [block])

  /*
   * Return to the previous block position when new position is out of the range
   * */
  useLayoutEffect(() => {
    if (
      block.position.col < 0 ||
      block.position.col >= gridNum.colNum ||
      block.position.row < 0 ||
      block.position.row >= gridNum.rowNum
    ) {
      changeBlockPosition({ blockId: block.id, position: previousPosition })
    }
  }, [
    block.id,
    block.position.col,
    block.position.row,
    changeBlockPosition,
    gridNum.colNum,
    gridNum.rowNum,
    previousPosition,
  ])

  /*
   * When block.editing is true, then the contenteditable element automatically gets focused.
   * */
  useEffect(() => {
    if (block.editing && mode === 'TEXT') {
      setTimeout(() => blockRef.current?.focus(), 0)
    } else {
      setTimeout(() => blockRef.current?.blur(), 0)
    }
  }, [block.editing, mode])

  const blockBorderIsVisible = pageConfigSelectors.useBlockBorderIsVisible()

  const style = BlockUtils.style(block, gridNum, blockBorderIsVisible)

  return (
    <>
      <StyledBlockSelection
        id={`block-${block.id}-selection`}
        style={{
          ...style,
          width: blockBorderIsVisible ? `calc(${style.width} + 1px)` : style.width,
          height: blockBorderIsVisible ? `calc(${style.height} + 1px)` : style.height,
          minWidth: blockBorderIsVisible ? `calc(${style.minWidth} + 1px)` : style.minWidth,
          minHeight: blockBorderIsVisible ? `calc(${style.minHeight} + 1px)` : style.minHeight,
          borderWidth: blockBorderIsVisible ? '1px' : '0px',
          display: block.isSelected ? '' : 'none',
          transform: `rotate(${block.angle}deg)`,
          transformOrigin: 'center center',
        }}
      />
      <StyledBlockWrapper
        id={`block-${block.id}-wrapper`}
        className="block-wrapper"
        style={{
          ...style,
          borderWidth: blockBorderIsVisible ? '1px' : '0px',
          borderColor: colorTheme.blockBorder,
          borderStyle: block.isSelected || block.editing ? 'solid' : 'dashed',
          backgroundColor: colorTheme.editorBackground,
          color: colorTheme.text,
          opacity: mode === 'BLOCKHINT' && !block.isSelected ? '0.5' : '',
          transform: `rotate(${block.angle}deg)`,
          transformOrigin: 'center center',
        }}
        onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (mode === 'CURSOR') {
            changeMode('SELECT')
            changeBlockStatus({ blockId: block.id, isEmpty: block.isEmpty, isSelected: true, editing: false })
          }
        }}
      >
        {' '}
        <LexicalComposer initialConfig={editorConfig}>
          <TextBlock block={block} />
        </LexicalComposer>
      </StyledBlockWrapper>
    </>
  )
}

export default React.memo(BlockTSX)
