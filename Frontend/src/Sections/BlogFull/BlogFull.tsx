import { useParams,useNavigate, Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { getBlog,decodeJWT,addFav } from '../../Utils/auth';
import { FaRegHeart,FaHeart  } from "react-icons/fa";
import Loading from '../../Components/Loading/Loading';

type Blog = {
  id: number;
  createdAt : string
  title: string;
  description: string;
  ownerID : number;
  user : {
    userName : string
  }
};

type prop = {
  token : any
}

export default function BlogFull({token} : prop) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog,setBlog] = useState<Blog | null>(null);
  const [decoded, setDecoded] = useState<any>() 
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (token) {
      setDecoded(decodeJWT(token));
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setBlog(await getBlog(id));
      setLoading(false);
    }
    fetchData();
  },[id])

  useEffect(()=>{
    if (!decoded || !id) return;
    const checkFav = async () => {
      const res = await fetch(`https://blog-up.onrender.com/blog/getFavBlogByID/${id}/${decoded.id}`,{
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      const data = await res.json();

      if(decoded.id == data?.[0]?.userID && id == data?.[0]?.blogID){
        setIsLiked(true);
      }
      else{
        setIsLiked(false);
      }
    }
    checkFav()
  },[decoded, id, token])

  const handleFav = async () => {
    if(!token){
      navigate('/signin')
    }
    else{
      addFav(decoded?.id, id, token);
      setIsLiked(true);
    }
  }

  return (
    <div>
      {
        !loading ? (
          <div className="font-[Urbanist] mt-8">
            <div className="w-full flex flex-col items-center">
              <div className='w-[70%]'>
                <div className='flex justify-between my-7'>
                  <Link to={`/profile/${blog?.user?.userName}`} className='hover:underline'>{blog?.user?.userName}</Link>
                  <div>{(blog?.createdAt)?.slice(0,10).split('-').reverse().join(' ')}</div>
                </div>
                <div>
                  <h1 className='font-medium text-5xl'>{blog?.title}</h1>
                  <p className='mt-4 text-lg mt-6' style={{ whiteSpace: "pre-line" }}>{blog?.description?.replace(/\\n/g, "\n")}</p>
                </div>
                <div className='mt-15 mb-5'>{isLiked ? <FaHeart className='text-red-500'/> : <FaRegHeart className='cursor-pointer' onClick={() => handleFav()}/>}</div>
              </div>
            </div>
          </div>) 
        : <Loading />
      }
  </div>
  )
}