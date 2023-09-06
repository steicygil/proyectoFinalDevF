import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './assets/components/Dashboard'
import ReactDOM from 'react-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Descripcion from './assets/components/Descripcion'



function App() {

  return (
 
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/serie/:id" element={<Descripcion/>}/>
      </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
