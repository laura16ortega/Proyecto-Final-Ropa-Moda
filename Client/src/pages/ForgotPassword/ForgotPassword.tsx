import React,{useState} from 'react'
import {toast} from 'react-toastify';
import styles from "./forgotPassword.module.css";
import { useAppDispatch } from "../../assets/hooks";
import { validateEmail, forgotPassword } from '../../redux/thunk-actions/authActions';
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const forgot = async(e:any)=>{
    e.preventDefault();
    console.log("click")
    if(!email){
      return toast.error("Please enter an email");
    }
    if(!validateEmail(email)){
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email
    }
    
    try {
      await dispatch(forgotPassword(userData));
      setEmail("")
      alert("Email send Succesfully");
    } catch (error) {
      return toast.error("Email not Found")
    }
  }
  return (
    <div className="container">
        <div className="card">
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              type="Email"
              placeholder="Email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <button
              type="submit"
            >
              Get Reset Password
            </button>
          </form>


          <div className="links">
            <p>
              <Link to="/">- Home</Link>
            </p>

            <p>
            <Link to="/login">- Login</Link>
            </p>
          </div>
        </div>
    </div>
  )
}

export default ForgotPassword