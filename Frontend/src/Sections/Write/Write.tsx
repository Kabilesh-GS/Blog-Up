import { useNavigate } from "react-router-dom"
import { decodeJWT, isTokenExpired, type MyJwtPayload } from "../../Utils/auth";
import { useEffect, useState } from "react";

type Props = {
  token : any
}

export default function Write({token} : Props) {

  const navigation = useNavigate();
  const [decoded, setDecoded] = useState<MyJwtPayload | null>(null);

  useEffect(() => {
    if(!token){
    navigation('/signin')
    }
    else{
      const payload = decodeJWT(token);
      setDecoded(payload);
    }
  },[token])

  return (
    <div className="font-[Urbanist] mt-15">
      <div className="flex justify-center">      
        <div className="flex flex-col w-[85%] md:w-[65%]">
          <label className="text-xl">Title</label>
          <input className="outline-0 border-b-1 text-5xl" placeholder="Give a Title" type="text"/>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col w-[85%] md:w-[65%]">
          <label>Content</label>
          <textarea className="outline-0 text-xl" placeholder="Start writing you'r story..."/>
        </div>
      </div>
      <div className="flex justify-center fixed bottom-10 left-[35%] md:w-[36%]">
        <button className="py-1.5 px-10 border rounded-full hover:text-white hover:bg-black cursor-pointer">Post</button>
      </div>
    </div>
  )
}