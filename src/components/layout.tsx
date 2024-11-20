import Header from "./header"

const Layout = ({children}:{children: React.ReactNode}) => {

return (
    <>
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <Header/>
    <div className="w-full max-w-[1140px] sm:px-5 px-2">
      {children}
    </div>
    </div>
    </>
  )
}

export default Layout