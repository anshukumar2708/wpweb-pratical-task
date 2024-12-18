import { useMemo, useState } from "react"


const UseMemoUse = () => {
    const [count, setCount] = useState(0)
    const [item, setItem] = useState(1)
 

    const UpdateCount = ()=> {
         setCount((pre)=>pre+1)
    }

    const UpdateItem = ()=> {
        setItem((pre)=>pre*2)
   }

   const multiCount = useMemo(()=>{
    console.log("Re-Render")
      return count * 2
   },[count])
    

  return (
    <div>
        <h1>Count : {count}</h1>
        <h1>Item : {item}</h1>
        <h1>multicount : {multiCount}</h1>
        <button onClick={UpdateCount}>Update Count</button> {" "}
        <button onClick={UpdateItem}>Update Item</button>
    </div>
  )
}

export default UseMemoUse