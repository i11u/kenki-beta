import React, { RefObject, useEffect } from 'react'
import { SetterOrUpdater } from 'recoil'
import { PageConfig } from '../recoil-hooks/pageConfig/atom'

const useOnWheelPageEffect = (
  pageRef: RefObject<HTMLDivElement>,
  setPreviousPageConfig: React.Dispatch<React.SetStateAction<PageConfig>>,
  setPageConfig: SetterOrUpdater<PageConfig>,
  throttle: (callback: () => void, time: number) => void
) => {
  useEffect(() => {
    pageRef.current?.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault()
          if (e.deltaY < 0) {
            throttle(
              () =>
                setPageConfig((prev: PageConfig) => {
                  if (prev.scale >= 2) return prev
                  setPreviousPageConfig(prev)
                  return { ...prev, scale: prev.scale + 0.02 }
                }),
              0
            )
          } else {
            throttle(
              () =>
                setPageConfig((prev: PageConfig) => {
                  if (prev.scale <= 0.35) return prev
                  setPreviousPageConfig(prev)
                  return { ...prev, scale: prev.scale - 0.02 }
                }),
              0
            )
          }
        }
      },
      { passive: false }
    )
  }, [pageRef, setPreviousPageConfig, setPageConfig, throttle])
}

export default useOnWheelPageEffect