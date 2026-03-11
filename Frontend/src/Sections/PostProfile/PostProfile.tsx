import { useEffect } from "react";
import { decodeJWT,isTokenExpired,userdetails } from "../../Utils/auth";
import { useNavigate ,useParams} from 'react-router-dom';

// type Prop = {
//   token : string | null
// }

// export default function PostProfile({token} : Prop) {

//   const navigate = useNavigate();
//   const tokenExpiry = isTokenExpired(decoded?.id);

//   useEffect(() => {
//      const decoded = decodeJWT(token);
//     if(tokenExpiry){
//       navigate('/signIn')
//     }
//     if(token == '' || token == null){
//       navigate('/signIn')
//     }
//   }, [])

//   return (
//     <div></div>
//   )
// }

type Prop = {
  token: string | null;
};

export default function PostProfile({ token }: Prop) {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/signIn");
      return;
    }

    const decoded = decodeJWT(token);
    if (!decoded || isTokenExpired(decoded.exp)) {
      navigate("/signIn");
      return;
    }

    (async () => {
      try {
        const details = await userdetails(Number(id), token);
        console.log(details);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        navigate("/signIn");
      }
    })();
  }, [token, navigate]);

  return <div></div>;
}