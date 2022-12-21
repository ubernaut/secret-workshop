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
    <title>Secret Workshop</title>
      <header className="App-header">
        <div id="container"  ref={container} style={{width:'99vw', height:'70vh'}}>
        <canvas id="canvas"  ref={canvas} style={{width:'99vw', height:'70vh'}}></canvas>
        </div>
        <p>
          Secret Workshop
        </p>
        <a style={{color: 'white', padding: '10px'}} href='https://secretworkshop.net/void/'>space sim</a>

        <a style={{color: 'white', padding: '10px'}} href='https://ubernaut.github.io/webgl/'>WebGL</a>

        <a style={{color: 'white', padding: '10px'}} href='https://github.com/ubernaut'>GitHub</a>

        <a style={{color: 'white', padding: '10px'}} href='https://github.com/ubernaut/resume/'>my resume</a>

        <p style={{padding: '10px'}}>
        Secret Workshop is intended to be a portfolio, a place to publish my content, and a company I can consult through. <br/> Thanks for visiting. -cos
        </p>
      </header>

    </div>
  )
}

export default App;
