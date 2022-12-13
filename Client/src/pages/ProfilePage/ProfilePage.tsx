import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Button, Link } from "@mui/material"
import Profile from '../../components/Profile/Profile';
import s from "./ProfilePage.module.css"
import { useAppDispatch, useAppSelector } from '../../assets/hooks';
import { logout } from "../../redux/slices/authSlice";
import { getOrders } from '../../redux/thunk-actions/orderActions';

const ProfilePage = () => {
   const { user } = useAppSelector(state => state.auth)
   const { orders } = useAppSelector(state => state.order)
   const [loadingOrder, setLoadingOrder] = useState<boolean>(true)
   const dispatch = useAppDispatch()

   const handleLogout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      dispatch(logout());
      setTimeout(() => {
         window.location.href = "/";
      }, 500);
   };

   const boughtByUser = orders.filter(e => e.user._id === user.userId).slice(-10).reverse()

   useEffect(() => {
      dispatch(getOrders())
      setTimeout(() => {
         setLoadingOrder(false)
      }, 1500);
   }, [])

   return (
      <Box>
         <Box className={s.customContainer}>
            <Box>
               <Box sx={{ paddingTop: "55px" }}>
                  <Grid container spacing={3} sx={{ alignItems: "center", justifyContent: "space-between", padding: ".4rem" }}>
                     <Grid item md={7} xs={12}>
                        <Typography variant="h3" className={s.title}>
                           {`Bienvenido a fc ${user.fullName}`}
                        </Typography>
                     </Grid>
                     <Grid item md={3} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="outlined" onClick={(e) => handleLogout(e)}>
                           Cerrar sesion
                        </Button>
                     </Grid>
                  </Grid>
               </Box>
               <Box sx={{ marginY: "30px" }}>
                  <Grid container spacing={1}>
                     <Grid item md={4} xs={12}>
                        <Profile />
                     </Grid>
                     <Grid item md={8} xs={12}>
                        <Box sx={{ backgroundColor: "black", color: "white", height: "100%", padding: "30px" }}>
                           <Typography variant="h4" sx={{ textAlign: "left", letterSpacing: "2px", lineHeight: 1, paddingBottom: "33px", borderBottom: "1px solid #ccc", fontWeight: "600" }}>Historial de compra</Typography>
                           {loadingOrder ?
                              <Box sx={{ display: "flex", justifyContent: "center", height: "75%", alignItems: "center" }}>
                                 <Box className={s.loader} />
                              </Box>
                              :
                              !boughtByUser.length ?
                                 <Grid container sx={{ paddingTop: "20px" }}>
                                    <Grid item md={9.5} xs={12} className={s.agregarAlgo}>
                                       <Typography variant="subtitle1" sx={{ textAlign: "left" }}>Looks like you have not placed any orders yet. Go on why not add something?</Typography>
                                    </Grid>
                                    <Grid item md={2.5} xs={12}>
                                       <Link href="/cart" sx={{ minWidth: "initial", fontSize: "16px", fontWeight: "normal", fontStyle: "normal", fontStretch: "normal", lineHeight: "normal", letterSpacing: "2px", textAlign: "center", color: "#fff" }}>
                                          <Typography variant="subtitle2" sx={{ border: "1px solid #fff", padding: "8px", fontWeight: "800", fontFamily: "poppins" }}>
                                             Agregar un producto
                                          </Typography>
                                       </Link>
                                    </Grid>
                                 </Grid>
                                 :
                                 <Box sx={{ paddingTop: "20px", maxHeight: "400px", overflow: "auto" }}>
                                    {loadingOrder ?
                                       <Box sx={{ display: "flex", justifyContent: "center", height: "75%", alignItems: "center" }}>
                                          <Box className={s.loader} />
                                       </Box>
                                       :
                                       boughtByUser.map(order =>
                                          <Box sx={{ position: "relative" }} key={order._id}>
                                             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                <Box sx={{ height: "2px", width: "30%", backgroundColor: "white" }} />
                                                <Typography variant="subtitle1" className={s.orderDate}>{`${new Date(order.createdAt).toLocaleString()}`}</Typography>
                                                <Box sx={{ height: "2px", width: "35%", backgroundColor: "white" }} />
                                             </Box>
                                             {order.orderItems.map((product, index) =>
                                                <Box sx={{ paddingY: ".4rem", paddingX: "1rem", display: "flex", alignItems: "center" }} key={index + 1}>
                                                   <Box sx={{ width: "5rem" }}>
                                                      <img src={product.image} alt="" style={{ height: "60px", maxWidth: "100%", borderRadius: "1px", display: "block" }} />
                                                   </Box>
                                                   <Box sx={{ flex: 1 }}>
                                                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left", }}>
                                                         <Link href={`/products/${product.product}`}>
                                                            <Typography variant="h6" sx={{ color: "white", maxWidth: "290px" }}>
                                                               {product.name}
                                                            </Typography>
                                                         </Link>
                                                         <Box sx={{ maxWidth: "150px", display: "flex", alignItems: "center", width: "30%", justifyContent: "space-between" }}>
                                                            <Typography variant="subtitle1">
                                                               {`${product.qty}u`}
                                                            </Typography>
                                                            <Typography variant="subtitle1">
                                                               {`$${product.price}`}
                                                            </Typography>
                                                         </Box>
                                                      </Box>
                                                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                                      </Box>
                                                   </Box>
                                                </Box>
                                             )}
                                             <Box sx={{ paddingX: "1rem" }}>
                                                <Typography variant="subtitle1" sx={{ textAlign: "right", fontWeight: "600" }}>{`Total: $${order.totalPrice}`}</Typography>
                                             </Box>
                                          </Box>
                                       )}
                                 </Box>
                           }
                        </Box>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Box>
      </Box>
   )
}

export default ProfilePage

//  <Typography variant="h1" sx={{color: "white"}}>algo</Typography>

/*

p card

<Box className={s.innerProfile}>
   <Box className={s.profileInfo}>
      <Box className={s.backgroundImage}>
         <img className={s.imgFit} src="placeholderimage" alt="nada" />
      </Box>
      <Box className={s.profilePhoto}>
         <Avatar src="none" alt="None" />
      </Box>
      <Box className={s.profileData}>
      <Box sx={{ display: "flex", flexDirection: "row" }}> 
         {editName ? (
            <div> </div>
         ) : (
            <Button onClick={e => {
               setEditName(!editName)
               setEditEmail(false)
               setInput({
               })
            }}>
               <EditIcon />
            </Button>
         )}
         {editName ? (
            <div>
               <TextField margin="normal" required id="fullName" label="Nuevo nombre" name="fullName" autoComplete="off" type="text" autoFocus onChange={inputHandler} />
               <Button sx={{ mt: 3, mb: 2 }} style={{ marginLeft: "1rem" }} onClick={e => {
                  setEditName(false)
                  setInput({})
               }
               }>
                  <CancelIcon />
               </Button>
               <Button name='name' sx={{ mt: 3, mb: 2 }} onClick={(event) => submitHandler(event)} >
                  <CheckIcon />
               </Button>
            </div>
         ) : (
            <div>
               <Typography component="h1" variant="h5" style={{ width: "10rem" }}>
                  {user.fullName}
               </Typography>
            </div>
         )}
         </Box>
         <Box sx={{ display: "flex", flexDirection: "row" }}>
                        {editEmail ? (
            <div>
               <TextField margin="normal" required id="email" label="Nuevo email" name="email" autoComplete="off" type="text" autoFocus onChange={inputHandler} />
               <Button sx={{ mt: 3, mb: 2 }} name='name' style={{ marginLeft: "1rem" }}
                  onClick={e => {
                     setEditEmail(false)
                     setInput({})
                  }}>
                  <CancelIcon />
               </Button>
               <Button name='name' sx={{ mt: 3, mb: 2 }}>
                  <CheckIcon />
               </Button>
            </div>
         ) : (
            <div>
               <Typography style={{ marginTop: "1rem" }}>
                  {user.email}
               </Typography>
            </div>
         )}
         {editEmail ? (
            <div> </div>
         ) : (
            <Button onClick={(e) => {
               setEditEmail(!editEmail)
               setEditName(false)
               setInput({
               })
            }}>
               <EditIcon />
            </Button>
         )}
         </Box>
         <p>{`Usuario desde: `}</p>
      </Box>
   </Box>
</Box>





<Box className={s.profileInfo}>
    <Box>
        <Box sx={{backgroundImage: `${user.backgroundimage}`, maxHeight: "150px", }}>
            <img src={`${user.backgroundImage}`}
        </Box>
        <Box className={s.profileImage}>
            <Box>
                <Avatar src="none" alt="None" sx={{width: "100%", height: "100%"}}/>
            </Box>
        </Box>
        <Box className={s.profileInfo}>
            <Box className={s.profileName} sx={{ display: "flex", flexDirection: "row" }}>
                                  {editName ? (
                     <div> </div>
                  ) : (
                     <Button onClick={e => {
                        setEditName(!editName)
                        setEditEmail(false)
                        setInput({
                        })
                     }}>
                        <EditIcon />
                     </Button>
                  )}
                  {editName ? (
                     <div>
                        <TextField margin="normal" required id="fullName" label="Nuevo nombre" name="fullName" autoComplete="off" type="text" autoFocus onChange={inputHandler} />
                        <Button sx={{ mt: 3, mb: 2 }} style={{ marginLeft: "1rem" }} onClick={e => {
                           setEditName(false)
                           setInput({})
                        }
                        }>
                           <CancelIcon />
                        </Button>
                        <Button name='name' sx={{ mt: 3, mb: 2 }} onClick={(event) => submitHandler(event)} >
                           <CheckIcon />
                        </Button>

                     </div>
                  ) : (
                     <div>
                        <Typography component="h1" variant="h5" style={{ width: "10rem" }}>
                           {user.fullName}
                        </Typography>
                     </div>
                  )}
            </Box>
            <Box className={s.profileEmail} sx={{ display: "flex", flexDirection: "row" }}>
                                      {editEmail ? (
                     <div>
                        <TextField margin="normal" required id="email" label="Nuevo email" name="email" autoComplete="off" type="text" autoFocus onChange={inputHandler} />
                        <Button sx={{ mt: 3, mb: 2 }} name='name' style={{ marginLeft: "1rem" }}
                           onClick={e => {
                              setEditEmail(false)
                              setInput({})
                           }}>
                           <CancelIcon />
                        </Button>
                        <Button name='name' sx={{ mt: 3, mb: 2 }}>
                           <CheckIcon />
                        </Button>
                     </div>
                  ) : (
                     <div>
                        <Typography style={{ marginTop: "1rem" }}>
                           {user.email}
                        </Typography>
                     </div>
                  )}
                  {editEmail ? (
                     <div> </div>
                  ) : (
                     <Button onClick={(e) => {
                        setEditEmail(!editEmail)
                        setEditName(false)
                        setInput({
                        })
                     }}>
                        <EditIcon />
                     </Button>
                  )}
            </Box>
        </Box>
        <Box className={s.downProfile}>
            <Button>boton</Button>
        </Box>
    </Box>
</Box>


.backgroundImage {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 340px;
    max-height: 150px;
    background-size: cover;
    overflow: hidden;
}

.backgroundImage img {
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    display: block;
}

.profileImage {
    width: 100px;
    height: 99.7px;

    or 
    height: 120px;
    width: 120px;

    border-radius: 50px;
    border: solid 2px #fff;
    margin: 0 auto;
    margin-top: -50px;
    position: relative;
}

.profileImage img {
    border-radius: 50px
}

.profileInfo {
    line-height: normal;
    letter-spacing: 1px;
    margin-top: 20px;
}

.profileName {

}

.profileEmail {
    line-height: 1.88;
}

.downProfile {
    margin-top: 120px;
}

.downProfile button {
    height: 40px;
    padding-top: 3px;
    padding-bottom: 0;
    border: 1px solid #f6f6f6;
    transition: .5s;
    width: 90%;
    margin: auto;
}
*/