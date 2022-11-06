import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Canvas } from '@react-three/fiber'
import Three from './components/three'

function App() {

  return (
    <Canvas id="three-canvas-container" shadows>
      <Suspense fallback={null}>
        <Three />
      </Suspense>
    </Canvas>
  )
}

export default App
