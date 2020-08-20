import React, { ReactElement, useState } from 'react'
import { ControlledEditor } from '@monaco-editor/react'

const NewRulePage = (): ReactElement => {
  const [code, setCode] = useState<string | undefined>('')

  return (
    <div>
      <h1>New rule</h1>
      <ControlledEditor
        theme="dark"
        height="50vh"
        language="javascript"
        options={{ minimap: { enabled: false } }}
        onChange={(event, value) => setCode(value)}
      />
      <button type="button" onClick={() => alert(code)}>
        code?
      </button>
    </div>
  )
}

export default NewRulePage
