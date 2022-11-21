import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Login() {
  const {isAuth,loginUser}=useContext(AuthContext)
  const [userInfo,setUserInfo]=useState({})
  const [disableSubmit,setDisableSubmit]=useState(false)

  if(isAuth){
    return <Navigate to="/dashboard"/>
  }

 
 const handleChange=(e)=>{
   const {name,value}=e.target
   setUserInfo({...userInfo,[name]:value})
 }

 const handleSubmit=(e)=>{
  e.preventDefault()
  setDisableSubmit(!disableSubmit)
  loginUser(userInfo)
 }

  return (
    <div className="login-page">
      <form className="form" data-testid="login-form" onSubmit={handleSubmit} >
        <div>
          <label>
            <input data-testid="email-input" type="email" placeholder="email" name="email"  onChange={(e)=>{handleChange(e)}} />
          </label>
        </div>
        <div>
          <label>
            <input
              data-testid="password-input"
              type="password"
              placeholder="password"
              name="password"
              onChange={(e)=>handleChange(e)}
            />
          </label>
        </div>
        <div>
          <button data-testid="form-submit" disabled={disableSubmit} type="submit">
            SUBMIT
          </button>
        </div>
      </form>
      <div>
        <Link className="message" to="/">
          Go Back
        </Link>
      </div>
    </div>
  );
}
export default Login;
