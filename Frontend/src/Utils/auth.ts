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

export function isTokenExpired(exp: any): boolean {
  console.log(Date.now());
  console.log(exp);
  return Date.now() / 1000 > exp;
}

export async function getUsers(userName : string | undefined){
  const response = await fetch(`https://blog-up.onrender.com/getUser/${userName}`)
  const data = await response.json();

  return data;
}

export async function getUserBlogs(userName : string | undefined){
  const response = await fetch(`https://blog-up.onrender.com/getUserPost/${userName}`)
  const data = await response.json();

  return data;
}

export async function getBlog(id : any){
  const response = await fetch(`https://blog-up.onrender.com/blog/fullBlog/${id}`)
  const data = await response.json();

  return data;
}

export async function editBlog(blogDTO : any, blogID : any, token : any){
  try{
    const response = await fetch(`https://blog-up.onrender.com/blog/editBlog/${blogID}`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body : JSON.stringify(blogDTO)
    })

    const data = await response.json();
    return data;
  }
  catch(err){
    return err;
  }
}

export async function addFav(userID : any, postID : any, token : any){
  try{
    await fetch(`https://blog-up.onrender.com/blog/addFav/${userID}/${postID}`,{
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