import { useState } from 'react'
import TodoUser from './components/TodoUser'
import Number from '../src/components/Number'
import './App.css'
import User from '../src/components/User'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="app">
    {/* <TodoUser />
      <Number /> */}
      <User />
    </div>
      
       
    </>
  )
}

export default App
