import hamburger from '../../../public/menus.png'
import logo from '../../../public/Logo transparent.png'
import NavBarPopUp from '../../Components/NavBarPopUp/NavBarPopUp'
import { useState } from 'react'

export default function NavBar() {

  const [isOpen, setIsOpen] = useState(false);

  const openSideBar = () =>{
    setIsOpen(true);
  }

  return (
    <>
      {isOpen && <NavBarPopUp closeSideBar={() => setIsOpen(false)}/>}
      <div className='flex justify-around items-center bg-gray-200 py-3 sticky top-0'>
        <div>
          <img src={hamburger} className='w-[30px] cursor-pointer' onClick={() => openSideBar()}/>
        </div>
        <div>
          <div className='flex justify-center items-center cursor-default'>
            <img src={logo} className='w-[50px]'/>
            <p className='text-[20px] font-[Urbanist] font-medium'>BlogUp</p>
          </div>
        </div>
        <div>
          <button className='font-[Urbanist] bg-white px-4 py-2 rounded-full border-solid border-1 cursor-pointer border-olive-950'>Sign In</button>
        </div>
      </div>
    </>
  )
}