import "./login.css";
import {useRef , useContext} from 'react'
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/authContext";
import { FaSpinner } from "react-icons/fa";

export default function Login() {
  const email =  useRef();
  const password = useRef();
  const { isFetching  , dispatch} = useContext(AuthContext)

 const  handleSubmit = (e)=>{
      e.preventDefault();
      loginCall({email : email.current.value, password : password.current.value}, dispatch)
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social-Fly</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social-Fly.
          </span>
        </div>
        <div className="loginRight" onSubmit = {handleSubmit}>
          <form className="loginBox">
            <input placeholder="Email" type = "email" className="loginInput" ref = {email}/>
            <input placeholder="Password" type = "password" className="loginInput" ref = {password} />
            <button className="loginButton">{ isFetching ? <FaSpinner/> : " Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}