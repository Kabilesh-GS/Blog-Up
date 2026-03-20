import { jwtDecode } from "jwt-decode";

export interface MyJwtPayload {
  id: number;
  userName: string;
  role: string;
  exp: number;
}

export function decodeJWT(token: string): MyJwtPayload | null {
  try {
    return jwtDecode<MyJwtPayload>(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(exp: number): boolean {
  console.log(Date.now());
  console.log(exp);
  return Date.now() / 1000 > exp;
}

export async function getUsers(userName : string | undefined){
  const response = await fetch(`http://localhost:3000/getUser/${userName}`)
  const data = await response.json();

  return data;
}

export async function getUserBlogs(userName : string | undefined){
  const response = await fetch(`http://localhost:3000/getUserPost/${userName}`)
  const data = await response.json();

  return data;
}

export async function getBlog(id : any){
  const response = await fetch(`http://localhost:3000/blog/fullBlog/${id}`)
  const data = await response.json();

  return data;
}

export async function addFav(userID : any, postID : any, token : any){
  try{
    await fetch(`http://localhost:3000/blog/addFav/${userID}/${postID}`,{
      method : 'POST',
      headers : {
        'Authorization' : `Bearer ${token}`
        }
    })

    return "user added"
  }
  catch(err){
    return err;
  }
}