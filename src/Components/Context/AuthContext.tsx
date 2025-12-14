import {jwtDecode} from "jwt-decode";
import { createContext, useEffect, useState, type PropsWithChildren } from "react";

export const AuthContext = createContext<any>(null);

export default function AuthContextProvider(props: PropsWithChildren) {
  const [loginData, setLoginData] = useState<any>(null);

  const saveLoginData = (token?: string) => {
    const encodedToken = token || localStorage.getItem("token");
    if (!encodedToken) return;

    const decodedToken: any = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
