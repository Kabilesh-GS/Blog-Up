import { Link } from 'react-router-dom';

type BlogsInter = {
  Blogs: any;
};

export default function Home({ Blogs }: BlogsInter) {
  return (
    <div className="font-[Urbanist] mt-8">
      <div className="w-full flex flex-col items-center">
        {Blogs.map((e: any) => ( 
          <Link to={`/blog/${e.id}`} key={e.id} className="w-[65%] hover:bg-gray-100 mb-2 hover:shadow-xl px-4 py-4 rounded-2xl cursor-pointer">
            <h2 className="text-[35px] font-medium text-justify">{e.title}</h2>
            <p className="text-justify">{e.description.slice(0,200) + " ..."}</p>
            <div className="mt-3 flex justify-between">
              <Link to={`/profile/${e.user.userName}`}>
                <span className="text-[10px] text-gray-400">By </span> 
                <span className="text-[15px] hover:underline">{e.user.userName}</span>
              </Link>
              <div>
                <span className="text-[12px]">{e.createdAt.slice(0,10).split('-').reverse().join(' ')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
