import logo from './gear.svg';
import './App.css';
import init from './LogoFlair.js'
import React from 'react'

function App() {
  //const container = React.useRef()
  const canvas = React.useRef()
  React.useEffect( ()=> {
    if (canvas.current) { init({canvas:canvas.current }) }})

  return (
    <div className="App">
    <title>Secret Workshop</title>
      <header className="App-header">

        <canvas id="canvas"  ref={canvas} style={{width:'100vw', height:'100vh', position:'fixed', left:'0', right:'0', 'zIndex':'0'}}></canvas>

        <div style={{'zIndex':'1', position: 'fixed', bottom:'0',left:'0',right:'0',  width:'100vw'}}>
        <p>
          Secret Workshop
        </p>
        <a style={{color: 'white', padding: '10px'}} href='https://ubernaut.github.io/webgl/#/snek'>snake game</a>
        <br/>
        <a style={{color: 'white', padding: '10px'}} href='https://secretworkshop.net/void/'>void (space physics sim)</a>
<br/>
        <a style={{color: 'white', padding: '10px'}} href='https://ubernaut.github.io/webgl/'>WebGL</a>
<br/>
        <a style={{color: 'white', padding: '10px'}} href='https://github.com/ubernaut'>GitHub</a>
<br/>
        <a style={{color: 'white', padding: '10px'}} href='https://github.com/ubernaut/resume/'>Resume</a>

        <p style={{padding: '10px', margin:'0px'}}>
        Secret Workshop is intended to be a portfolio, a place to publish my content, and a company I can consult through. <br/> Thanks for visiting. -cos
        </p>
        </div>
      </header>

    </div>
  )
}

export default App;
