import { createContext, useContext, useState } from "react"

interface IUser {
   id: number;
   name: string ;
}

interface IUserContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

const userContext = createContext<IUserContext | undefined>(undefined);

const UserContext = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser | null>({id:1, name: "Anshu"})
  return (
    <userContext.Provider value={{user, setUser}}>{children}</userContext.Provider>
  )
}

const useUserContext = ()=>{
    const context = useContext(userContext)
    if(!context){
        throw new Error("Error in context")
    }
  return context;
    
}

export { UserContext, useUserContext}