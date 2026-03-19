import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="flex justify-center mt-20 font-[Urbanist]">
      <div className="w-[30%]">
        <form className="flex flex-col gap-6">
          <div className="flex justify-between items-center ">
            <label>Name</label>
            <input type="text" className="bg-gray-100 rounded p-1.5" placeholder="Enter Name"/>
          </div>
          <div className="flex justify-between items-center">
            <label>User Name</label>
            <input type="text" className="bg-gray-100 rounded p-1.5" placeholder="Enter a Unique Name"/>
          </div>
          <div className="flex justify-between items-center ">
            <label>Email</label>
            <input type="email" className="bg-gray-100 rounded p-1.5" placeholder="Email"/>
          </div>
          <div className="flex justify-between items-center">
            <label>Password</label>
            <input type="password" className="bg-gray-100 rounded p-1.5" placeholder="Password"/>
          </div>
          <button type="submit" className="bg-black text-white py-3 rounded-full cursor-pointer">Sign Up</button>
        </form>
        <p className='text-center text-sm mt-8'>Have an account? <Link to='/signIn' className='text-red-400'>Sign In</Link></p>
      </div>
    </div>
  )
}