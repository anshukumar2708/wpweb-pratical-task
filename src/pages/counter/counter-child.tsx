import { memo } from "react";

const CounterChild = ({Increment, Deccrement}: {Increment : ()=>void,Deccrement : ()=>void} ) => {
  console.log("Re-Render")
  return (
    <>
    <div>counter-child</div>
    <button onClick={Increment}>Incre</button> {" "}
    <button onClick={Deccrement}>Decre</button>
    </>
  )
}

export default  memo(CounterChild);