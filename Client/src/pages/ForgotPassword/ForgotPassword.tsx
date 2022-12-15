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
      return toast.error("Ingrese un email");
    }
    if(!validateEmail(email)){
      return toast.error("Por favor ingrese un email valido");
    }
    const userData = {email}
    try {
      await dispatch(forgotPassword(userData));
      setEmail("")
      toast.success("Email enviado satisfactoriamente")
    } catch (error) {
      return toast.error("Email not Found")
    }
  }



  return (
/*     <Grid>
      <Paper  elevation={10} className={styles.paper}>
        <form onSubmit={forgotSubmit} className={styles.form}>
               <fieldset className='form-container'>
                <legend><strong>He olvidado mi contraseña</strong></legend>
                Email: 
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
               </fieldset>
               <input type="text" />
            <button>Send Email</button>
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
            <div className={styles.links}>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
      </Paper>
    </Grid> */
    <Grid>
      <Paper  elevation={20} className={styles.paper}>
        <form onSubmit={forgotSubmit} className={styles.form}>
               <fieldset>
                <legend><strong>He olvidado mi contraseña</strong></legend>
                Email: <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
               </fieldset>
               
            <button>Enviar email</button>
            <div className={styles.links}>
              <Link to="/register">Registrarse</Link>
              <Link to="/login">Ingresar</Link>
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