import { useAtomValue } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { useCallback } from 'react'
import { PageConfig, pageConfigAtom } from './atom'

type PageConfigSelectors = {
  usePageConfig: () => PageConfig
  useGridNum: () => { rowNum: number; colNum: number }
  usePageScale: () => number
  useGridIsVisible: () => boolean
  useBlockBorderIsVisible: () => boolean
  useEditingTitle: () => boolean
  useTitle: () => string
}
const usePageConfigSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config, [])
    )
  )

const useGridNumSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config.gridNum, [])
    )
  )

const usePageScaleSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config.scale, [])
    )
  )

const useGridIsVisibleSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config.gridIsVisible, [])
    )
  )

const useBlockBorderIsVisibleSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config.blockBorderIsVisible, [])
    )
  )

const useEditingTitleSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config.editingTitle, [])
    )
  )

const useTitleSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config.title, [])
    )
  )

export const pageConfigSelectors: PageConfigSelectors = {
  usePageConfig: usePageConfigSelector,
  useGridNum: useGridNumSelector,
  usePageScale: usePageScaleSelector,
  useGridIsVisible: useGridIsVisibleSelector,
  useBlockBorderIsVisible: useBlockBorderIsVisibleSelector,
  useEditingTitle: useEditingTitleSelector,
  useTitle: useTitleSelector,
}
