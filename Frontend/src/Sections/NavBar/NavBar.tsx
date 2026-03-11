import hamburger from '../../../public/menus.png'
import logo from '../../../public/Logo transparent.png'
import NavBarPopUp from '../../Components/NavBarPopUp/NavBarPopUp'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {

  const [isOpen, setIsOpen] = useState(false);

  const openSideBar = () =>{
    setIsOpen(true);
  }

  let Token = localStorage.getItem('token');

  return (
    <>
      {isOpen && <NavBarPopUp closeSideBar={() => setIsOpen(false)}/>}
      <div className='flex justify-around shadow-xl items-center bg-gray-200 py-3 sticky top-0'>
        <div>
          <img src={hamburger} className='w-[30px] cursor-pointer' onClick={() => openSideBar()}/>
        </div>
        <div>
          <Link to='/' className='flex justify-center items-center cursor-default'>
            <img src={logo} className='w-[50px]'/>
            <p className='text-[20px] font-[Urbanist] font-medium'>BlogUp</p>
          </Link>
        </div>
        <div>
          {Token ? 
            <Link to='/profile'><h1>{}</h1></Link>
          :
            <Link to='/signIn'><button className='font-[Urbanist] bg-white px-4 py-2 rounded-full border-solid border-1 cursor-pointer border-olive-950'>Sign In</button></Link>
          }
          
        </div>
      </div>
    </>
  )
}