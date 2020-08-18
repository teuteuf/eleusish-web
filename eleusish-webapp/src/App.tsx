import React, { useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import Editor from '@monaco-editor/react'

const App = (): JSX.Element => {
  const valueGetter = useRef(() => {
    // do nothing
  })

  function handleEditorDidMount(_valueGetter: () => string) {
    valueGetter.current = _valueGetter
  }

  function handleShowValue() {
    alert(valueGetter.current())
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Editor
          theme="dark"
          height="30vh"
          width="80%"
          language="javascript"
          options={{ minimap: { enabled: false } }}
          editorDidMount={handleEditorDidMount}
        />
        <button type="button" onClick={handleShowValue}>
          code?
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
