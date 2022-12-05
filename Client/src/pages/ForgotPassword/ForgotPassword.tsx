import React,{useState} from 'react'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./forgotPassword.module.css";
import { useAppDispatch } from "../../assets/hooks";
import { Grid, Paper } from '@mui/material'
import { validateEmail, forgotPassword } from '../../redux/thunk-actions/authActions';
import { Link } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const forgotSubmit = async(e:any)=>{
    e.preventDefault();
    if(!email){
      return toast.error("Please enter an email");
    }
    if(!validateEmail(email)){
      return toast.error("Please enter a valid email");
    }
    const userData = {email}
    try {
      await dispatch(forgotPassword(userData));
      setEmail("")
      toast.success("Email Send Succesffuly")
    } catch (error) {
      return toast.error("Email not Found")
    }
  }
 
  return (
    <Grid>
      <Paper  elevation={20} className={styles.paper}>
        <h1>Forgot Password</h1>
        <form onSubmit={forgotSubmit} className={styles.form}>
            <label htmlFor="email">
              <input
                 type="email" 
                 id="email" 
                 placeholder='Email'
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
               />
            </label>
            <button>Send Email</button>
            <div className={styles.links}>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"/>
        </form>
      </Paper>
    </Grid>
  )
}

export default ForgotPassword