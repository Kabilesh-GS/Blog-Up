import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';


type User = {
  name : string;
  email : string;
  username : string
};

export default function PostProfile() {

  const { id } = useParams();
  const [userDetail,setUserDetail] = useState<User | null>(null);
  const [userBlogs,setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getDetails(){
      setLoading(true);
      const user = await fetch(`http://localhost:3000/getUser/${id}`)
      const blogs = await fetch(`http://localhost:3000/getUserPost/${id}`)
      const userData = await user.json();
      const blogsData = await blogs.json();
      setUserDetail(userData);
      setUserBlogs(blogsData);
      setLoading(false)
    }

    getDetails();
  },[id])

  return (
    <div>
      {!loading ? (
        <div className='flex flex-col justify-center font-[Urbanist]'>
          <div className='flex flex-col justify-center items-center mt-10'>
            <h3 className='text-2xl font-bold'>{userDetail?.username}</h3>
            <div className='flex gap-15 mt-5'>
              <p><span className='text-gray-400'>Full Name : </span>{userDetail?.name}</p>
              <p><span className='text-gray-400'>Email : </span>{userDetail?.email}</p>
            </div>
          </div>
          <div className='flex justify-center mt-5'>
            {userBlogs.map((e: any) => ( 
              <Link to={`/blog/${e.id}`} key={e.id} className="w-[65%] hover:bg-gray-100 hover:shadow-xl px-4 py-4 rounded-2xl mb-2 cursor-pointer">
                <h2 className="text-[25px] font-medium text-justify">{e.title}</h2>
                <p className="text-justify">{e.description.slice(0,200) + " ..."}</p>
                <div className="mt-3 flex justify-between">
                  <div>
                    <span className="text-[10px]">{e.createdAt.slice(0,10).split('-').reverse().join(' ')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        ) : (
        <Loading />
      )}
    </div>
  );
}