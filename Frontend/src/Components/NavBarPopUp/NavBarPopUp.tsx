import logo from '../../../public/Logo transparent.png'
import { TiHome } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TbLogin, TbLogout } from "react-icons/tb";
import { Link ,useNavigate } from 'react-router-dom';
import { decodeJWT } from '../../Utils/auth';
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { setToken } from "../../Redux/Slice/authSlice";

type Props = {
  closeSideBar: () => void;
};

export default function NavBarPopUp({ closeSideBar }: Props) {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const decoded = token ? decodeJWT(token) : null;

  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(setToken(null));
    navigate('/');

    console.log('inside handle signOut')
  }

  return (
    <div className="bg-gray-300 shadow-2xl w-[300px] h-full fixed top-0 z-20">
      <div className='flex justify-between items-center w-full px-3 py-3'>
        <img src={logo} className='w-[50px]'/>
        <p  onClick={closeSideBar} className="bg-white py-1 px-3 cursor-pointer rounded-full">X</p>
      </div>
      <div className='flex flex-col justify-between h-screen'>
        <div className='px-5 pt-4'>
          <ul className='flex flex-col gap-2'>
            <li className='cursor-pointer'>
              <Link to="/" className='flex content-center items-center gap-5.5 font-[Urbanist] hover:bg-gray-500 p-4 rounded-2xl hover:text-white hover:shadow-xl'><TiHome className='text-[25px]'/>Home</Link>
            </li>
            <li className='cursor-pointer'>
              <Link to="/write" className='flex content-center items-center gap-5.5 font-[Urbanist] hover:bg-gray-500 p-4 rounded-2xl hover:text-white hover:shadow-xl'><FaPencilAlt className='text-[25px]'/>Write</Link>
            </li>
            {
              token ? 
              <li className='cursor-pointer'>
                <Link to={`/profile/${decoded?.userName}`} className='flex content-center items-center gap-5.5 font-[Urbanist] hover:bg-gray-500 p-4 rounded-2xl hover:text-white hover:shadow-xl'><FaCircleUser className='text-[25px]'/>Profile</Link>
              </li> : 
              <li className='cursor-pointer'>
                <Link to={`/signin`} className='flex content-center items-center gap-5.5 font-[Urbanist] hover:bg-gray-500 p-4 rounded-2xl hover:text-white hover:shadow-xl'><TbLogin className='text-[25px] rotate-'/>Sign In</Link>
              </li>
            }
          </ul>
        </div>
        {
          decoded && (
          <div className='px-5 pt-4'>
            <ul className='mb-30'>
              <li className='cursor-pointer'>
                <a onClick={() => handleSignOut()} className='flex content-center items-center gap-5.5 font-[Urbanist] hover:bg-gray-500 p-4 rounded-2xl hover:text-white hover:shadow-xl'><TbLogout className='text-[25px]'/>Sign Out</a>
              </li>
            </ul>
          </div>
          )
        }
      </div>
    </div>
  )
}
