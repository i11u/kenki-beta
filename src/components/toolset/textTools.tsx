import { useState } from 'react'

const TextTools = () => {
  const [optionKeyIsPressed, setOptionKeyIsPressed] = useState(false)

  return optionKeyIsPressed ? (
    <div className="toolset-text-tools-option">text tool option</div>
  ) : (
    <div className="toolset-text-tools">text tool</div>
  )
}

export default TextTools
