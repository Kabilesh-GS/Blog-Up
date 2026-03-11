import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitForm = async (e : any) => {
    e.preventDefault();
    const data = await fetch('http://localhost:3000/auth/login',{
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
    localStorage.setItem('token', returnData.accessToken);
    navigate("/");
    console.log(returnData);  
  }

  return (
    <div className="flex justify-center mt-20 font-[Urbanist]">
      <div className="w-[30%]">
        <form className="flex flex-col gap-6" onSubmit={submitForm}>
          <div className="flex justify-between items-center ">
            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 rounded p-1.5" placeholder="Email"/>
          </div>
          <div className="flex justify-between items-center">
            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 rounded p-1.5" placeholder="Password"/>
          </div>
          <button type="submit" className="bg-black text-white py-3 rounded-full cursor-pointer">Sign In</button>
        </form>
        <p className='text-center text-sm mt-8'>Have an account? <Link to='/signUp' className='text-red-400'>Sign Up</Link></p>
      </div>
    </div>
  )
}