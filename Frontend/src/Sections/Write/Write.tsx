import { useNavigate } from "react-router-dom"
import { decodeJWT, isTokenExpired, type MyJwtPayload } from "../../Utils/auth";
import { useEffect, useState } from "react";

type Props = {
  token : any
}

export default function Write({token} : Props) {

  const navigation = useNavigate();
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [decoded, setDecoded] = useState<MyJwtPayload | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const payload = decodeJWT(token);

    if (!payload?.exp || isTokenExpired(payload.exp)) {
      navigation('/signin');
      return;
    }

    setDecoded(payload);
  }, [token]);

  const handleSubmit = async () => {
    try{
      fetch(`http://localhost:3000/blog/addPost`,{
        method : 'POST',
        headers : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body : JSON.stringify({
          title : title,
          description : description
        })
      })

      navigation(`/profile/${decoded?.userName}`)
    }
    catch{
      window.alert('Post Failed')
    }
  }

  return (
    <form className="font-[Urbanist] mt-15" onSubmit={handleSubmit}>
      <div className="flex justify-center">      
        <div className="flex flex-col w-[85%] md:w-[65%]">
          <label className="text-xl">Title</label>
          <input onChange={(e) => setTitle(e.target.value)} className="outline-0 border-b-1 text-5xl" placeholder="Give a Title" type="text"/>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col w-[85%] md:w-[65%]">
          <label>Content</label>
          <textarea className="outline-0 text-xl mb-10" onChange={(e) => setDescription(e.target.value)} onInput={(e: any) => {e.target.style.height = e.target.scrollHeight + "px"}} placeholder="Start writing you'r story..."/>
        </div>
      </div>
      <div className="flex justify-center fixed bottom-10 left-[35%] md:w-[36%]">
        <button type="submit" className="py-1.5 px-10 border rounded-full hover:text-white hover:bg-black cursor-pointer">Post</button>
      </div>
    </form>
  )
}