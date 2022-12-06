import React,{useState} from 'react'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./resetPassword.module.css";
import { useAppDispatch } from "../../assets/hooks";
import { Grid, Paper } from '@mui/material'
import {resetPassword } from '../../redux/thunk-actions/authActions';
import { Link, useParams} from "react-router-dom";

const initialState = {
  password: "",
  confirmPassword: ""
}
type userData = {
  password: string;
  resetToken: string | undefined;
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const {password, confirmPassword} = formData;
  const dispatch = useAppDispatch();
  const {resetToken} = useParams();

  const handleInputChange = (e:any)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]:value})
  }
  const resetSubmit = async(e:any)=>{
    e.preventDefault();

    if(password.length < 6){
      return toast.error("Passwords must be up to 6 characters");
    }
    if(password !== confirmPassword){
      return toast.error("Passwords do not match")
    }
    const userData = {password,resetToken}
    //console.log(userData)
    try {
      const data = await dispatch(resetPassword(userData));
      toast.success("Password Updated Succesfully")
      setTimeout(()=>{
        window.location.href = "/login";
      },800)
    } catch (error) {
      console.log(error)
      toast.error("error")
    }
  }
  
 
  return (
    <Grid>
      <Paper  elevation={20} className={styles.paper}>
        <form onSubmit={resetSubmit} className={styles.form}>
          <fieldset>
            <legend><strong>Reset Password</strong></legend>
            <input 
               type="password"
               name="password" 
               placeholder='Password'
               value={password}
               onChange={handleInputChange} 
            />
            <input 
               type="password" 
               name="confirmPassword"
               placeholder='ConfirmPassword'
               value={confirmPassword}
               onChange={handleInputChange} 
            />
          </fieldset>
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