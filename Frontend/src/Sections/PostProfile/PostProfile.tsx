import { useParams} from 'react-router-dom';

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

export default function PostProfile() {
  const { id } = useParams();

  return <div>{id}</div>;
}