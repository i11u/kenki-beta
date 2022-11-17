import React from 'react'
import { BlockUtils } from './block'
import { Block, Position } from '../jotai-hooks/blocks/atom'

export class PageUtils {
  public static handleOnMouseDown = ({
    e,
    gridNum,
    id,
    changeBlockStatus,
    changeBlockPosition,
    addBlock,
  }: {
    e: React.MouseEvent<HTMLDivElement>
    gridNum: { rowNum: number; colNum: number }
    id: string | undefined
    changeBlockStatus: ({
      blockId,
      isEmpty,
      isSelected,
      editing,
    }: {
      blockId: string
      isEmpty: boolean
      isSelected: boolean
      editing: boolean
    }) => void
    changeBlockPosition: ({ blockId, position }: { blockId: string; position: Position }) => void
    addBlock: ({ block }: { block: Block }) => void
  }) => {
    if (id === undefined) return
    const blockDiv = document.getElementById(`block-${id}`) as HTMLDivElement
    const { row, col } = PageUtils.getPositionFromMouseDownEvent(e, gridNum)

    if (blockDiv.textContent === '') {
      changeBlockPosition({ blockId: id, position: { row, col } })
      setTimeout(() => {
        blockDiv.focus()
      }, 0)
      return
    }

    changeBlockStatus({ blockId: id, isEmpty: false, isSelected: false, editing: false })
    addBlock({ block: BlockUtils.emptyBlock({ position: { row, col } }) })
  }

  public static getPositionFromMouseDownEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    gridNum: {
      rowNum: number
      colNum: number
    }
  ): Position => ({
    row: Math.floor(e.nativeEvent.offsetY / ((e.target as HTMLDivElement).clientHeight / gridNum.rowNum)),
    col: Math.floor(e.nativeEvent.offsetX / ((e.target as HTMLDivElement).clientWidth / gridNum.colNum)),
  })
}
