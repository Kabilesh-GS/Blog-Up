import { useEffect, useState } from 'react'
import './App.css'
import Loading from './Components/Loading/Loading'
import NavBar from './Sections/NavBar/NavBar'
import Home from './Sections/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './Sections/Profile/Profile';
import Signup from './Sections/SignUp/Signup';
import BlogFull from './Sections/BlogFull/BlogFull';
import SignIn from './Sections/SignIn/SignIn';
import { jwtDecode } from "jwt-decode";

function App() {

  interface MyJwtPayload {
    id: number;
    email: string;
    role: string;
  }

  const token = localStorage.getItem('token')
  let email = ''
  if(token){
    const decoded = jwtDecode<MyJwtPayload>(token);
    email = decoded.email;
  }

  const[blogs, setBlogs] = useState([]);
  const[loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFun = async () => {
      setLoading(true);
      const data = await fetch('http://localhost:3000/blog/getPosts')
      const JSONData = await data.json();
      setBlogs(JSONData);
      setLoading(false);
    }

    fetchFun();
  },[])

  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={ loading ? <Loading /> : <Home Blogs={blogs}/> }/>
          <Route path="/profile" element={<Profile email={email}/>} />
          <Route path="/signUp" element={<Signup/>} />
          <Route path="/blog/:id" element={<BlogFull />} />
          <Route path='/signIn' element={<SignIn />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
