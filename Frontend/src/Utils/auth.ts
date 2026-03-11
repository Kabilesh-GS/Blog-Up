import { jwtDecode } from "jwt-decode";

export interface MyJwtPayload {
  id: number;
  email: string;
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

export async function userdetails(id: number, token: string) {
  const response = await fetch(`http://localhost:3000/getUser/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return response.json();
}