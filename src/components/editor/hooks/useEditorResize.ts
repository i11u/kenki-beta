import { useEffect, useState } from 'react'

const useEditorResize = () => {
  const [dimensions, setDimensions] = useState({ height: window.innerHeight, width: window.innerWidth })
  return useEffect(() => {
    const handleOnResize = () => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth })
    }

    window.addEventListener('resize', handleOnResize)

    return function cleanup() {
      window.removeEventListener('resize', handleOnResize)
    }
  }, [])
}

export default useEditorResize
