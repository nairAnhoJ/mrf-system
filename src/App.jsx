import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRouter from './routes/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-neutral-800 w-screen h-screen py-4 pr-4 overflow-hidden'>
        <AppRouter />
      </div>
    </>
  )
}

export default App
