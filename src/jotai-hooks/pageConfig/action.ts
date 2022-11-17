import { useCallback } from 'react'
import { useAtomCallback } from 'jotai/utils'
import { GridNum, pageConfigAtom } from './atom'

type PageConfigActions = {
  useChangeGridNum: () => (gridNum: GridNum) => void
  useChangeScale: () => (scale: number) => void
  useToggleGridIsVisible: () => () => void
  useToggleBlockBorderIsVisible: () => () => void
  useToggleEditingTitle: () => () => void
}

export const pageConfigActions: PageConfigActions = {
  useChangeGridNum: () =>
    useAtomCallback(
      useCallback(
        (get, set, gridNum) =>
          set(pageConfigAtom, (prev) => ({
            ...prev,
            gridNum,
          })),
        []
      )
    ),

  useChangeScale: () =>
    useAtomCallback(
      useCallback((get, set, scale) => {
        if (scale < 0.5) return
        if (scale >= 2.1) return
        set(pageConfigAtom, (prev) => ({
          ...prev,
          scale,
        }))
      }, [])
    ),
  useToggleGridIsVisible: () =>
    useAtomCallback(
      useCallback((get, set) => {
        set(pageConfigAtom, (prev) => ({
          ...prev,
          gridIsVisible: !prev.gridIsVisible,
        }))
      }, [])
    ),
  useToggleBlockBorderIsVisible: () =>
    useAtomCallback(
      useCallback((get, set) => {
        set(pageConfigAtom, (prev) => ({
          ...prev,
          blockBorderIsVisible: !prev.blockBorderIsVisible,
        }))
      }, [])
    ),
  useToggleEditingTitle: () =>
    useAtomCallback(
      useCallback((get, set) => {
        set(pageConfigAtom, (prev) => ({
          ...prev,
          editingTitle: !prev.editingTitle,
        }))
      }, [])
    ),
}
