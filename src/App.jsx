import { useState } from 'react'
import Todolisit from './Pages/Todolisit'

function App() {
  const [count, setCount] = useState(0)

  return (<div>
    
    <Todolisit/>
  
  </div>
    
  )
}

export default App
