import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { Link,useParams } from 'react-router-dom';
import { getUsers,getUserBlogs, decodeJWT } from '../../Utils/auth';
import { FaHeart } from "react-icons/fa6";

type User = {
  name : string;
  email : string;
  username : string
};

export default function PostProfile({token} : any) {

  const { userName } = useParams();
  const [userDetail,setUserDetail] = useState<User | null>(null);
  const [userBlogs,setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favBtn, setFavBtn] = useState(false);
  const [openFav, setOpenFav] = useState(false);
  const [favBlogs, setFavBlogs] = useState<any>()

  useEffect(() => {
    async function getDetails(){
      setLoading(true);
      const decoded = decodeJWT(token)
      setUserDetail(await getUsers(userName));
      setUserBlogs(await getUserBlogs(userName));
      setLoading(false)

      if(decoded?.userName === userName){
        setFavBtn(true);
      }

      const response = await fetch(`http://localhost:3000/blog/getFav/${decoded?.id}`);
      const data = await response.json();
      console.log(data);
      setFavBlogs(data);
    }

    getDetails();
  },[userName,token])

  const handleFav = () => {
    openFav ? setOpenFav(false) : setOpenFav(true);
  }

  return (
    <div>
      {!loading ? (
        <div className='flex flex-col justify-center font-[Urbanist]'>
          <div className='flex flex-col justify-center items-center mt-10'>
            <h3 className='text-2xl font-bold'>{userDetail?.username}</h3>
            <div className='flex-col md:flex-row flex gap-5 md:gap-15 mt-5'>
              <p><span className='text-gray-400'>Full Name : </span>{userDetail?.name}</p>
              <p><span className='text-gray-400'>Email : </span>{userDetail?.email}</p>
            </div>
          </div>
          <div className='flex justify-center mt-5'>
            <div className='w-[65%]'>
            {favBtn ? 
              <button onClick={handleFav} className={`${openFav ? 'bg-gray-200' : ''} flex items-center gap-3 p-4 cursor-pointer rounded-xl hover:bg-gray-100`}>
                <FaHeart />
                <p>Favourites</p>
              </button> 
              : <> </>
            }
            </div>
          </div>
          <div className=''>
            {openFav ? 
            <div className='flex flex-col items-center justify-center mt-5'>
              {favBlogs?.map((e : any) => (
                <Link to={`/blog/${e?.blogs?.id}`} key={e?.blogs?.id} className="w-[65%] hover:bg-gray-100 hover:shadow-xl p-4 rounded-2xl mb-2 cursor-pointer">
                  <h2 className="text-[25px] font-medium text-justify">{e?.blogs?.title}</h2>
                  <p className="text-justify">{e?.blogs?.description?.slice(0,200) + " ..."}</p>
                  <div className="mt-3 flex justify-between">
                    <div>
                      <span className="text-[10px]">{e?.blogs?.createdAt?.slice(0,10)?.split('-')?.reverse()?.join(' ')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div> : 
            <div className='flex flex-col justify-center items-center mt-5'>
              {userBlogs.map((e: any) => ( 
                <Link to={`/blog/${e?.id}`} key={e?.id} className="w-[65%] hover:bg-gray-100 hover:shadow-xl p-4 rounded-2xl mb-2 cursor-pointer">
                  <h2 className="text-[25px] font-medium text-justify">{e.title}</h2>
                  <p className="text-justify">{e?.description?.slice(0,200) + " ..."}</p>
                  <div className="mt-3 flex justify-between">
                    <div>
                      <span className="text-[10px]">{e?.createdAt?.slice(0,10)?.split('-')?.reverse()?.join(' ')}</span>
                    </div>
                  </div>
                </Link>
              ))}
             </div>
            }
          </div>
        </div>
        ) : (
        <Loading />
      )}
    </div>
  );
}