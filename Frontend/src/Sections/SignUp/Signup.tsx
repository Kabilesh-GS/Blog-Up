import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {

  const[name,setName] = useState<string | null>()
  const[email,setEmail] = useState<string | null>()
  const[userName,setUserName] = useState<string | null>()
  const[password,setPassword] = useState<string | null>()

  const submitForm = async (e : any) => {
    e.preventDefault();
    try{
      const data = await fetch('https://blog-up.onrender.com/auth/register',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          fullName : name,
          userName : userName,
          email : email,
          password : password
        })
      })

      console.log(await data.json())
    }
    catch(e){
      return e;
    }



    setEmail('');
    setName('');
    setPassword('');
    setUserName('');
    window.alert('account created')
  }

  return (
    <div className="flex justify-center mt-20 font-[Urbanist]">
      <div className="w-[30%]">
        <form onSubmit={submitForm} className="flex flex-col gap-6">
          <div className="flex justify-between items-center ">
            <label>Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} className="bg-gray-100 rounded p-1.5" placeholder="Enter Name"/>
          </div>
          <div className="flex justify-between items-center">
            <label>User Name</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)} className="bg-gray-100 rounded p-1.5" placeholder="Enter a Unique Name"/>
          </div>
          <div className="flex justify-between items-center ">
            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 rounded p-1.5" placeholder="Email"/>
          </div>
          <div className="flex justify-between items-center">
            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 rounded p-1.5" placeholder="Password"/>
          </div>
          <button type="submit" className="bg-black text-white py-3 rounded-full cursor-pointer">Sign Up</button>
        </form>
        <p className='text-center text-sm mt-8'>Have an account? <Link to='/signIn' className='text-red-400'>Sign In</Link></p>
      </div>
    </div>
  )
}