import React, { useState } from 'react'

import {
  Playground,
  SkypackImportMap,
  SourceFile,
  BabelTypescriptTransform
} from 'react-esm-sandbox'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

const importMap = SkypackImportMap({
  react: 'latest',
  'react-dom': 'latest',
  '@material-ui/core': 'latest'
})

const transforms = {
  tsx: BabelTypescriptTransform(),
  ts: BabelTypescriptTransform()
}

const App = () => {
  const [files, setFiles] = useState([
    {
      path: 'index.tsx',
      contents: `
        import React from 'react';
        import ReactDOM from 'react-dom';
        import { Typography } from '@material-ui/core';
        import { add, subtract } from './math/index.js';
  
        ReactDOM.render(<Typography>{add(50, subtract(20, 10))}</Typography>, document.body)
      `
    },
    {
      path: 'math/add.js',
      contents: `
        export const add = (a, b) => a + b;
      `
    },
    {
      path: 'math/subtract.js',
      contents: `
        export const subtract = (a, b) => a - b;
      `
    },
    {
      path: 'math/index.js',
      contents: `
        export * from './add.js'
        export * from './subtract.js'
      `
    }
  ])

  const updateFile = (file: SourceFile) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.path === file.path) {
          return file
        }
        return f
      })
    )
  }

  return (
    <Playground
      selectedFile='index.tsx'
      onLoading={() => console.log('loading')}
      onLoad={() => console.log('loaded')}
      entrypoint='index.tsx'
      files={files}
      importMap={importMap}
      onLog={(data: any) => window.alert(JSON.stringify(data))}
      transforms={transforms}
      onChange={updateFile}
    />
  )
}

export default App
