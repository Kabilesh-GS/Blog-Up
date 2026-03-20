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
  },[])

  return (
    <div>
      {decoded?.id}
      <div>
        <label>Title</label>
        <input type="text"/>
      </div>
      <br/>
      <br/>
      <div>
        <label>Content</label>
        <textarea/>
      </div>
    </div>
  )
}