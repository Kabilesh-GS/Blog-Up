type SideBar = {
  closeSideBar : any
}

export default function NavBarPopUp({closeSideBar} : SideBar) {
  return (
    <div className="bg-gray-100 w-[300px] h-full absolute z-20">
      <button onClick={closeSideBar}>X</button>
    </div>
  )
}
