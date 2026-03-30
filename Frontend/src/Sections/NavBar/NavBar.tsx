import hamburger from '../../../public/menus.png'
import logo from '../../../public/Logo transparent.png'
import NavBarPopUp from '../../Components/NavBarPopUp/NavBarPopUp'
import { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { decodeJWT } from '../../Utils/auth';
import { useAppSelector } from "../../Redux/hooks";
import { setToken } from "../../Redux/Slice/authSlice";

export default function NavBar() {

  const [isOpen, setIsOpen] = useState(false);
  const [decoded, setDecoded] = useState<any>()

  const openSideBar = () =>{
    setIsOpen(true);
  }

  const token : any = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchDecode(){
      setDecoded(await decodeJWT(token))
    }
    fetchDecode()
  },[token])

  const hasToken = Boolean(token);
  return (
    <>
      {isOpen && <NavBarPopUp closeSideBar={() => setIsOpen(false)} />}
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
          { hasToken ? <Link to={`/profile/${decoded?.userName}`}><h1><FaRegUserCircle className='text-3xl'/></h1></Link> : <Link to='/signIn'><button className='font-[Urbanist] bg-white px-4 py-2 rounded-full border-solid border-1 cursor-pointer border-olive-950'>Sign In</button></Link> }
        </div>
      </div>
    </>
  )
}