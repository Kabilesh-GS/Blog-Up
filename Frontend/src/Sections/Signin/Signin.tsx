import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

type Prop = {
  setToken : any
}

export default function SignIn({setToken} : Prop) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [emailError,setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e : any) => {
    e.preventDefault();

    if(email == null || email == ''){
      setEmailError(true);
      return
    }
    if(password==null || password == ''){
      setPassError(true);
      return
    }

    const data = await fetch('https://blog-up.onrender.com/auth/login',{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        email: email,
        password: password
      })
    })

    const returnData = await data.json()
    console.log()
    localStorage.setItem('token', returnData.accessToken);
    setToken(returnData?.accessToken);
    setPassError(false);
    setEmailError(false);
    navigate("/");
  }

  return (
    <div className="flex justify-center mt-20 font-[Urbanist]">
      <div className="w-[30%]">
        <form className="flex flex-col gap-6" onSubmit={submitForm}>
          <div className="flex flex-col md:flex-col justify-between items-center ">
            <div className='flex w-full justify-between items-center'>
              <label>Email</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 rounded p-1.5" placeholder="Email"/>
            </div>
            <p className={`text-red-500 text-xs ${emailError ? 'block' : 'hidden'}`}>Enter a valid email</p>
          </div>
          <div className="flex flex-col md:flex-col justify-between items-center">
            <div className='flex w-full justify-between items-center'>
              <label>Password</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 rounded p-1.5" placeholder="Password"/>
            </div>
            <p className={`text-red-500 text-xs ${passError ? 'block' : 'hidden'}`}>Enter a password</p>
          </div>
          <button type="submit" className="bg-black text-white py-3 rounded-full cursor-pointer">Sign In</button>
        </form>
        <p className='text-center text-sm mt-8'>Don't have an account? <Link to='/signUp' className='text-red-400'>Sign Up</Link></p>
      </div>
    </div>
  )
}