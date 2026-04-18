import { useEffect, useState } from "react";
import { Link } from "react-router"
import { useParams } from "react-router-dom"
import { getBlog } from "../../Utils/auth";
import Loading from "../../Components/Loading/Loading";

export default function EditBlog() {
  const { id } = useParams();
  const [oldBlog,setOldBlog] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const blog = await getBlog(id);
      setOldBlog(blog);
      setLoading(false);
    }
    fetchData();
  },[id])

  return (
    loading ? <Loading /> :
      <form className="font-[Urbanist] mt-15" onSubmit={() => {}}>
        <div className="flex justify-center">      
          <div className="flex flex-col w-[85%] md:w-[65%]">
            <label className="text-xl">Title</label>
            <input className="outline-0 border-b-1 text-5xl" placeholder="Give a Title" type="text" defaultValue={oldBlog?.title}/>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <div className="flex flex-col w-[85%] md:w-[65%]">
            <label>Content</label>
            <textarea className="outline-0 text-xl mb-10 h-[400px]" onInput={(e: any) => {e.target.style.height = e.target.scrollHeight + "px"}} placeholder="Start writing you'r story..." defaultValue={oldBlog?.description}/>
          </div>
        </div>
        <div className="flex justify-center fixed bottom-10 w-[100%] gap-5">
          <button type="submit" className="py-1.5 px-10 border rounded-full hover:text-white hover:bg-black cursor-pointer">Edit</button>
          <Link to={`/blog/${id}`}><button type="button" className="py-1.5 px-10 border rounded-full hover:text-white hover:bg-black cursor-pointer">Cancel</button></Link>
        </div>
      </form>
  )
}