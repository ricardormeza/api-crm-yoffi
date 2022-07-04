import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IniciarSesion from './layout/IniciarSesion'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<IniciarSesion />}>
              <Route/>
          </Route>
          <Route path='/clientes' element={<Layout />}>
            <Route index element={<Inicio />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
