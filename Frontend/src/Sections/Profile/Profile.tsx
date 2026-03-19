import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJWT, isTokenExpired, type MyJwtPayload } from "../../Utils/auth";

type Prop = {
  token: string | null;
};

export default function Profile({ token }: Prop) {
  const navigate = useNavigate();
  const [decoded, setDecoded] = useState<MyJwtPayload | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/signIn");
      return;
    }

    const payload = decodeJWT(token);
    if (!payload || isTokenExpired(payload.exp)) {
      navigate("/signIn");
      return;
    }

    setDecoded(payload);
  }, [token, navigate]);

  return <>{decoded?.email}</>;
}
