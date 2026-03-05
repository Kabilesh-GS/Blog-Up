import logo from '../../../public/Logo transparent.png'
import { TiHome } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';

type SideBar = {
  closeSideBar : any
}

export default function NavBarPopUp({closeSideBar} : SideBar) {
  return (
    <div className="bg-gray-300 shadow-2xl w-[300px] h-full absolute z-20">
      <div className='flex justify-between items-center w-full px-3 py-3'>
        <img src={logo} className='w-[50px]'/>
        <p  onClick={closeSideBar} className="bg-white py-1 px-3 cursor-pointer rounded-full">X</p>
      </div>
      <div className='px-5 pt-4'>
        <ul className='flex flex-col gap-2'>
          <li className='cursor-pointer'>
            <Link to="/" className='flex content-center items-center gap-5.5 font-[Urbanist] hover:bg-gray-500 p-4 rounded-2xl hover:text-white hover:shadow-xl'><TiHome className='text-[25px]'/>Home</Link>
          </li>
          <li className='cursor-pointer'>
            <Link to="/write" className='flex content-center items-center gap-5.5 font-[Urbanist] hover:bg-gray-500 p-4 rounded-2xl hover:text-white hover:shadow-xl'><FaPencilAlt className='text-[25px]'/>Write</Link>
          </li>
          <li className='cursor-pointer'>
            <Link to="/profile" className='flex content-center items-center gap-5.5 font-[Urbanist] hover:bg-gray-500 p-4 rounded-2xl hover:text-white hover:shadow-xl'><FaCircleUser className='text-[25px]'/>Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
