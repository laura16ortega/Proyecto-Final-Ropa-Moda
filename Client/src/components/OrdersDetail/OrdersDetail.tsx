import React, { useEffect } from 'react'
import {
   Box,
   Container,
   Grid,
   Typography,
   Paper,
   Table,
   TableContainer,
   TableBody,
   TableCell,
   TableHead,
   TableRow
} from "@mui/material"
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../assets/hooks'
import { orderById } from '../../redux/thunk-actions/orderActions'
import s from "./OrderDetail.module.css"

type ParamsType = {
   id: string
}

const OrdersDetail = () => {
   const dispatch = useAppDispatch()
   const { id } = useParams<keyof ParamsType>() as ParamsType

   useEffect(() => {
      dispatch(orderById(id))
   }, [])

   const { orderDetailsLoading, orderDetails } = useAppSelector(state => state.order)

   const headers = ["#", "Imagen", "Nombre", "Precio", "Cantidad", "Subtotal"]
   const taxes = ["", "", "", "", "Impuestos: ", "N/A"]
   const total = ["", "", "", "", "Total: ", `$${orderDetails?.totalPrice}`]


   return (
      <Box sx={{ backgroundColor: "#EBEFF3", display: "flex", flex: 1 }}>
         {orderDetailsLoading ? <h1>Load</h1> :
            <Container maxWidth="xl" sx={{ paddingY: "30px" }}>
               <Box sx={{ backgroundColor: "white" }}>
                  <Box sx={{ padding: "10px" }}>
                     <Typography variant="h6" sx={{ textAlign: "left", padding: "20px", borderBottom: "1px solid #f3f3f3", marginBottom: "10px" }}>
                        Detalles de orden
                     </Typography>
                     <Box sx={{ paddingX: "1.5rem" }}>
                        <Box sx={{ paddingY: "1.5rem" }}>
                           <Grid container spacing={2}>
                              <Grid item md={3} xs={12}>
                                 <Box sx={{ border: "1px solid #e1e2e6", borderRadius: "15px", overflow: "hidden" }}>
                                    <Box sx={{ backgroundColor: "#F7F7F7", padding: "5px" }}>
                                       <Typography variant="h6" sx={{ color: "#56606e" }}>
                                          Usuario:
                                       </Typography>
                                    </Box>
                                    <Box sx={{ padding: "20px", textAlign: "left" }}>
                                       <Typography variant='subtitle2'>{orderDetails?.user.fullName}</Typography>
                                       <Typography variant='subtitle2'>{orderDetails?.user.email}</Typography>
                                       <Typography variant='subtitle2'>id: {orderDetails?.user._id}</Typography>
                                    </Box>
                                 </Box>
                              </Grid>
                              <Grid item md={3} xs={12}>
                                 <Box sx={{ border: "1px solid #e1e2e6", borderRadius: "15px", overflow: "hidden", height: "100%" }}>
                                    <Box sx={{ backgroundColor: "#F7F7F7", padding: "5px" }}>
                                       <Typography variant="h6" sx={{ color: "#56606e" }}>
                                          Fecha de orden:
                                       </Typography>
                                    </Box>
                                    <Box sx={{ padding: "20px", textAlign: "left" }}>
                                       <Typography variant='subtitle2'>{`${orderDetails?.createdAt.split("T")[0].split("-").reverse().join(".")},`}</Typography>
                                       <Typography variant='subtitle2'>{`${orderDetails?.createdAt.split("T")[1].slice(0, 5)}`}</Typography>
                                    </Box>
                                 </Box>
                              </Grid>
                           </Grid>
                        </Box>
                        <Box sx={{ backgroundColor: "#f7f7f7", border: "1px solid #f7f7f7", padding: "10px", marginTop: "30px", marginBottom: "10px" }}>
                           <Typography variant="h5" sx={{ color: "#2b2b2b" }}>
                              Informe de productos
                           </Typography>
                        </Box>
                        <Box>
                           <TableContainer component={Paper}>
                              <Table aria-label="orderausdghuyas" >
                                 <TableHead sx={{ backgroundColor: "#F7F8F9" }}>
                                    <TableRow>
                                       {headers.map(e =>
                                          <TableCell key={e}>{e}</TableCell>
                                       )}
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {orderDetails?.orderItems.map((e, i) =>
                                       <TableRow className={s.row} key={i}>
                                          <TableCell>{i + 1}</TableCell>
                                          <TableCell sx={{ padding: "5px" }}><img style={{ width: "4.5rem", height: "4.5rem" }} src={e.image} alt="caca" /></TableCell>
                                          <TableCell>{e.name}</TableCell>
                                          <TableCell>{`$${e.price}`}</TableCell>
                                          <TableCell>{e.qty}</TableCell>
                                          <TableCell>{`$${e.price * e.qty}`}</TableCell>
                                       </TableRow>
                                    )}
                                    <TableRow className={s.row}>
                                       {taxes.map((e, i) =>
                                          <TableCell className={s.bottomRow} key={i}>{e}</TableCell>
                                       )}
                                    </TableRow>
                                    <TableRow className={s.row}>
                                       {total.map((e, i) =>
                                          <TableCell className={s.bottomRow} key={i}>{e}</TableCell>
                                       )}
                                    </TableRow>
                                 </TableBody>
                              </Table>
                           </TableContainer>
                        </Box>
                     </Box>
                  </Box>
               </Box>
            </Container>
         }
      </Box>
   )
}

export default OrdersDetail