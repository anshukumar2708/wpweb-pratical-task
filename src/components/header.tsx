import { message } from "antd";
import { useNavigate } from "react-router-dom"


const Header = () => {
 const navigate  = useNavigate();

 
  const logOutHandler = ()=> {
    localStorage.clear()
    navigate("/login")
    message.success("Logout Sucessfull")
  }

  return (
    <>
      <div className="w-full flex justify-center items-center h-16 bg-blue-500">
      <div className="max-w-[1140px] w-full flex justify-between items-center px-2">
        <h1 className="font-bold">Logo</h1>
        <button onClick={logOutHandler} className="bg-white text-black px-5 py-1 font-medium rounded-md hover:bg-slate-300">
            Logout
        </button>
      </div>
      </div>
    </>
  )
}

export default Header