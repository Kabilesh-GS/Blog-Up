import logo from '../../../public/Logo transparent.png'

type SideBar = {
  closeSideBar : any
}

export default function NavBarPopUp({closeSideBar} : SideBar) {
  return (
    <div className="bg-gray-100 w-[300px] h-full absolute z-20">
      <div className='flex justify-between items-center w-full px-3 py-3'>
        <img src={logo} className='w-[50px]'/>
        <p  onClick={closeSideBar} className="bg-white py-1 px-3 cursor-pointer rounded-full">X</p>
      </div>
    </div>
  )
}
