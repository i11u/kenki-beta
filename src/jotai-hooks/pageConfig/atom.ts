import { atom } from 'jotai'

export type GridNum = {
  rowNum: number
  colNum: number
}

export type PageConfig = {
  scale: number
  gridIsVisible: boolean
  blockBorderIsVisible: boolean
  editingTitle: boolean
  title: string
  gridNum: GridNum
}

export const pageConfigAtom = atom<PageConfig>({
  scale: 1,
  gridIsVisible: true,
  blockBorderIsVisible: true,
  editingTitle: false,
  title: '鍵記 kenki',
  gridNum: { rowNum: 36, colNum: 64 },
})
