import { useEffect } from "react";
import Chart from "../chart/Chart"
import FeaturedInfo from "../featuredInfo/FeaturedInfo"
import "./home.css"
import { userData } from "../../../dummyData";
import WidgetSm from "../widgetSm/WidgetSm";
import WidgetLg from "../widgetLg/WidgetLg";
import { Box, Container, Grid } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../assets/hooks";
//import { getAllProducts } from "../../../redux/thunk-actions/testActions";
//import { getOrders } from "../../../redux/thunk-actions/orderActions";
//import { getAllUsers } from "../../../redux/thunk-actions/allUsersActions";

const DashboardHome = () => {
   //const dispatch = useAppDispatch()
   const { orders, ordersLoading } = useAppSelector(state => state.order)
   const { allData, loading } = useAppSelector(state => state.data)

   /*
   Pasado a MainDashboard.tsx, descomentar en caso de errores

   useEffect(() => {
      dispatch(getAllProducts())
      dispatch(getOrders())
   }, [])
   */

   const TotalRevenue = orders?.reduce((total, item) => total + item.totalPrice, 0);

   return (
      <Box className="home">
         {loading || ordersLoading ? <Box>skeleton</Box> :
            <Box>
               <Container maxWidth="xl" sx={{ paddingY: "30px" }}>
                  <FeaturedInfo allData={allData.length} allOrders={orders.length} ingresos={TotalRevenue}/> {/* pasar users length orders length products length y total de ventas */}
                  <Chart data={userData} title="Análisis de Usuarios" grid dataKey="Active User" />
                  <Box className="homeWidgets">
                     <Grid container spacing={3}>
                        <WidgetSm />
                        <WidgetLg orderData={orders.slice(0, 5)}/>
                     </Grid>
                  </Box>
               </Container>
            </Box>
         }
      </Box>
   )
}

export default DashboardHome


