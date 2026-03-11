import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';

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

export default function BlogFull() {
  const { id } = useParams();
  const [blog,setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:3000/blog/fullBlog/${id}`);
      const JSONData = await data.json();
      setBlog(JSONData);
    }

    fetchData();
  },[id])

  return (
    <div className="font-[Urbanist] mt-8">
      <div className="w-full flex flex-col items-center">
        <div className='w-[70%]'>
          <div className='flex justify-between my-7'>
            <div>{blog?.user?.userName}</div>
            <div>{(blog?.createdAt)?.slice(0,10).split('-').reverse().join(' ')}</div>
          </div>
          <div>
            <h1 className='font-medium text-5xl'>{blog?.title}</h1>
            <p className='mt-4'>{blog?.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}