import { useParams,useNavigate, Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { getBlog,decodeJWT,addFav } from '../../Utils/auth';
import { FaRegHeart } from "react-icons/fa";

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

  useEffect(() => {
    const fetchData = async () => {
      setDecoded(decodeJWT(token));
      setBlog(await getBlog(id));
    }

    fetchData();
  },[id,token])

  const handleFav = async () => {
    if(!token){
      navigate('/signin')
    }
    else{
      console.log(decoded?.id + " " + id);
      addFav(decoded?.id, id, token);
    }
  }

  return (
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
          <div className='mt-15 mb-5'><FaRegHeart className='cursor-pointer' onClick={() => handleFav()}/></div>
        </div>
      </div>
    </div>
  )
}