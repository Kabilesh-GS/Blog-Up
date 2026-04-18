import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import './App.css'
import Loading from './Components/Loading/Loading'
import NavBar from './Sections/NavBar/NavBar'
import Home from './Sections/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Profile from './Sections/Profile/Profile';
import Signup from './Sections/SignUp/Signup';
import BlogFull from './Sections/BlogFull/BlogFull';
import SignIn from './Sections/Signin/Signin';
import PostProfile from './Sections/PostProfile/PostProfile';
import Write from './Sections/Write/Write';
import { setBlogs, setLoading } from "./Redux/Slice/blogSlice";
import EditBlog from './Sections/EditBlog/EditBlog';

function App() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const blogs = useAppSelector((state) => state.blogs.blogs);
  const loading = useAppSelector((state) => state.blogs.loading);

  useEffect(() => {
    const fetchFun = async () => {
      dispatch(setLoading(true))
      const data = await fetch("https://blog-up.onrender.com/blog/getPosts");
      const JSONData = await data.json();
      dispatch(setBlogs(JSONData));
      dispatch(setLoading(false))
    }

    fetchFun();
  },[token])

  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={ loading ? <Loading /> : <Home Blogs={blogs}/> }/>
          {/* <Route path="/profile" element={<Profile token={token} />} /> */}
          <Route path="/signUp" element={<Signup/>} />
          <Route path="/blog/:id" element={<BlogFull token={token}/>} />
          <Route path='/edit-blog/:id' element={<EditBlog/>} />
          <Route path='/signIn' element={<SignIn/>} />
          <Route path='/profile/:userName' element={<PostProfile token={token}/>} />
          <Route path='/write' element={<Write token={token}/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
