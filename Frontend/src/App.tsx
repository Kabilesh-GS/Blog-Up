import { useEffect, useState } from 'react'
import './App.css'
import Loading from './Components/Loading/Loading'
import NavBar from './Sections/NavBar/NavBar'
import Home from './Sections/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './Sections/Profile/Profile';
import Signup from './Sections/SignUp/Signup';
import BlogFull from './Sections/BlogFull/BlogFull';
import SignIn from './Sections/Signin/Signin';
import PostProfile from './Sections/PostProfile/PostProfile';
import Write from './Sections/Write/Write';

function App() {
  const [token, setToken] = useState<string | null | undefined>();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
    const fetchFun = async () => {
      setLoading(true);
      const data = await fetch("http://localhost:3000/blog/getPosts");
      const JSONData = await data.json();
      setBlogs(JSONData);
      setLoading(false);
    }

    fetchFun();
  },[token])

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={ loading ? <Loading /> : <Home Blogs={blogs}/> }/>
          {/* <Route path="/profile" element={<Profile token={token} />} /> */}
          <Route path="/signUp" element={<Signup/>} />
          <Route path="/blog/:id" element={<BlogFull token={token}/>} />
          <Route path='/signIn' element={<SignIn setToken={setToken}/>} />
          <Route path='/profile/:userName' element={<PostProfile token={token}/>} />
          <Route path='/write' element={<Write token={token}/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
