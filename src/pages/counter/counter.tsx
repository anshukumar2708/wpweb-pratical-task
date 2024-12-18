import { useCallback, useState } from "react"
import CounterChild from "./counter-child"

const Counter = () => {
  const [count, setCount] = useState(0);

  const Increment = useCallback(()=> {
    setCount((pre)=> pre+1)
  },[])

  const Deccrement = useCallback(()=> {
    setCount((pre)=> pre-1)
  },[])

  return (
    <div>
      <h1>Count : {count}</h1>
      <CounterChild Increment ={Increment} Deccrement={Deccrement}/>
    </div>
  )
}

export default Counter