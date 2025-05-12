import { useState } from 'react'
import Navbar from './components/Navbar'
import BodyComp from './components/BodyComp'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <BodyComp />
    </>
  )
}

export default App
