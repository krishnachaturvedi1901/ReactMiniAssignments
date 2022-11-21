import { createContext, useState } from "react";

export const AuthContext=createContext()

function AuthContextProvider({children}) {
    const [isAuth,setIsAuth]=useState(false)
    const [token,setToken]=useState(null)

    const loginUser = ({email,password}) => {
        fetch(`https://reqres.in/api/login`, {
          method:"POST",
          body: JSON.stringify( {email: email,
            password: password}),
            headers:{"Content-Type":"application/json"}
          })
          .then((res)=>res.json())
          .then((res) => {
            setToken(res.token);
          })
          .then(() => setIsAuth(!isAuth))
          .catch((err) => {
            console.log("error fromaxios", err);
          });
      };

    const logoutUser=()=>{
        setIsAuth(!isAuth)
        setToken(null)
    }
    return(
        <AuthContext.Provider value={{token,isAuth,loginUser,logoutUser}}>
         {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
