import { useEffect, useState } from 'react'
import './App.css'
import Loading from './Components/Loading/Loading'
import NavBar from './Sections/NavBar/NavBar'
import Home from './Sections/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './Sections/Profile/Profile';

function App() {

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
          <Route path='/profile' element={<Profile />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
