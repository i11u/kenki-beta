import { useEffect } from 'react'

const useKeydownHandler = () => {
  useEffect(() => {
    let callback: (e: KeyboardEvent) => void
    // document.addEventListener('keydown', callback)
    return function cleanup() {
      document.removeEventListener('keydown', callback)
    }
  }, [])
}

export default useKeydownHandler
