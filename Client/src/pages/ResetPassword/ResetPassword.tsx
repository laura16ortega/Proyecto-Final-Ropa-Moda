import React,{useState} from 'react'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./resetPassword.module.css";
import { useAppDispatch } from "../../assets/hooks";
import { Grid, Paper } from '@mui/material'
import { validateEmail, forgotPassword, resetPassword } from '../../redux/thunk-actions/authActions';
import { Link, useParams} from "react-router-dom";
import axios from 'axios'
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
  

  /*const a = async(e:any)=>{
    e.preventDefault();
    const postData = {
      userId:"637f973969727709fc0af594",
      rating: 1,
      comment:"comentario test"
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODc5YzE3NTAwOWQ1MGJlNDMwODQ1MiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Njk4MzI1NjQsImV4cCI6MTY2OTgzOTc2NH0.mRiPj2QwM3gNmx93ZgTf6OM9BvJqjgcx5HLvas29DAE'
    const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2Y5NzM5Njk3Mjc3MDlmYzBhZjU5NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2OTgzMTI4NiwiZXhwIjoxNjY5ODM4NDg2fQ.NtxC_toulbeJJ6ID3PQFpVtsXtlqtw15F4HFXZbNLkI'
    const {data} = await axios.post(
      `http://localhost:3001/api/v1/products/review/637fcc49a48a7923c4dfccc6`,
      postData,
      {headers: {Authorization:`Bearer ${token}`}}
    )

    console.log(data)
  }*/
 
  return (
    <Grid>
      <Paper  elevation={20} className={styles.paper}>
        <h1>Create a new password</h1>
        <form onSubmit={resetSubmit} className={styles.form}>
            <label htmlFor="password">
              <input
                 type="password" 
                 id="password" 
                 placeholder='New Password'
                 value={password}
                 name="password"
                 onChange={handleInputChange}
               />
            </label>
            <label htmlFor="confirmPassword">
              <input
                 type="password" 
                 id="confirmPassword" 
                 name="confirmPassword"
                 placeholder='Confirm Password'
                 value={confirmPassword}
                 onChange={handleInputChange}
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