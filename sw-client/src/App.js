import logo from './gear.svg';
import './App.css';
import init from './LogoFlair.js'
import React from 'react'

function App() {
  const container = React.useRef()
  const canvas = React.useRef()
  React.useEffect( ()=> {
    if (container.current) { init({canvas:canvas.current, container:container.current }) }})

  return (
    <div className="App">
      <header className="App-header">
        <div id="container"  ref={container} style={{width:'99vw', height:'70vh'}}>
        <canvas id="canvas"  ref={canvas} style={{width:'99vw', height:'70vh'}}></canvas>
        </div>
        <p>
          Secret Workshop
        </p>
      </header>
    </div>
  )
}

export default App;