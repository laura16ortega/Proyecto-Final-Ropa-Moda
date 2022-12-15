import { useEffect } from "react";
import Chart from "../chart/Chart"
import FeaturedInfo from "../featuredInfo/FeaturedInfo"
import "./home.css"
import { userData } from "../../../dummyData";
import WidgetSm from "../widgetSm/WidgetSm";
import WidgetLg from "../widgetLg/WidgetLg";
import { Box, Container, Grid } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../assets/hooks";
import { OrderType } from "../../../redux/types/orderTypes";
import { selectUsers } from "../../../redux/slices/allUsersSlice";
//import { getAllProducts } from "../../../redux/thunk-actions/testActions";
//import { getOrders } from "../../../redux/thunk-actions/orderActions";
//import { getAllUsers } from "../../../redux/thunk-actions/allUsersActions";

type WeeklyIncomeType = {
   1?: OrderType[]
   2?: OrderType[]
   3?: OrderType[]
   4?: OrderType[]
   5?: OrderType[]
   6?: OrderType[]
   0?: OrderType[]
   [index: number]: any // :s
}

const DashboardHome = () => {
   //const dispatch = useAppDispatch()
   const { orders, ordersLoading } = useAppSelector(state => state.order)
   const { allData, loading } = useAppSelector(state => state.data)
   const { allUsers, usersError, usersLoading } = useAppSelector(state => state.allUsers);

   const todayDate = new Date()

   // Semanal

   const prev7days = new Date(todayDate)
   prev7days.setDate(prev7days.getDate() - 7)

   const past7days = new Date(todayDate)
   past7days.setDate(past7days.getDate() + 7)

   const thisWeekOrders = orders.filter(d => +new Date(d.createdAt) >= +prev7days && +new Date(d.createdAt) < +past7days)
   const thisWeekTotal = thisWeekOrders.reduce((total, item) => total + item.totalPrice, 0)

   // Mensual | NOTA: Empieza a filtrar a partir de el dia 1 del mes, no hace x dias ----> Pasar a algo similar como lo de arriba

   const currentMonth = todayDate.getMonth() + 1 // No se por que tira el mes previo
   const currentYear = todayDate.getFullYear()

   const lastMonthOrders = orders.filter(e => {
      let [year, month] = e.createdAt.split("T")[0].split("-")
      return (currentMonth === +month) && (currentYear.toString() === year)
   })
   const thisMonthTotal = lastMonthOrders.reduce((total, item) => total + item.totalPrice, 0)

   // Datos del chart

   const past7Days = [...Array(7).keys()].map(index => {
      const date = new Date();

      date.setDate(date.getDate() - (index));

      return date.getDay();
   }).reverse();

   const testdata: WeeklyIncomeType = thisWeekOrders.reduce((weekday: WeeklyIncomeType, item) => {
      if (!weekday[+new Date(item.createdAt).getDay()]) weekday[+new Date(item.createdAt).getDay()] = [];
      weekday[+new Date(item.createdAt).getDay()].push(item);
      return weekday;
   }, {});

   const dateToName = (n: number) => {
      if (n === 1) return "Lunes"
      if (n === 2) return "Martes"
      if (n === 3) return "Miercoles"
      if (n === 4) return "Jueves"
      if (n === 5) return "Viernes"
      if (n === 6) return "Sabado"
      if (n === 0) return "Domingo"
   }

   const totalDayOrder = (weekname: string | undefined, data: WeeklyIncomeType) => {
      if (weekname === "Lunes") return data[1] ? data[2]?.reduce((total, item) => total + item.totalPrice, 0) : 0
      else if (weekname === "Martes") return data[2] ? data[2]?.reduce((total, item) => total + item.totalPrice, 0) : 0
      else if (weekname === "Miercoles") return data[3] ? data[3]?.reduce((total, item) => total + item.totalPrice, 0) : 0
      else if (weekname === "Jueves") return data[4] ? data[4]?.reduce((total, item) => total + item.totalPrice, 0) : 0
      else if (weekname === "Viernes") return data[5] ? data[5]?.reduce((total, item) => total + item.totalPrice, 0) : 0
      else if (weekname === "Sabado") return data[6] ? data[6]?.reduce((total, item) => total + item.totalPrice, 0) : 0
      else if (weekname === "Domingo") return data[0] ? data[0]?.reduce((total, item) => total + item.totalPrice, 0) : 0
   }

   const allDates = [
      {
         name: dateToName(past7Days[0]),
         Total: totalDayOrder(dateToName(past7Days[0]), testdata),
      },
      {
         name: dateToName(past7Days[1]),
         Total: totalDayOrder(dateToName(past7Days[1]), testdata),
      },
      {
         name: dateToName(past7Days[2]),
         Total: totalDayOrder(dateToName(past7Days[2]), testdata),
      },
      {
         name: dateToName(past7Days[3]),
         Total: totalDayOrder(dateToName(past7Days[3]), testdata),
      },
      {
         name: dateToName(past7Days[4]),
         Total: totalDayOrder(dateToName(past7Days[4]), testdata),
      },
      {
         name: dateToName(past7Days[5]),
         Total: totalDayOrder(dateToName(past7Days[5]), testdata),
      },
      {
         name: dateToName(past7Days[6]),
         Total: totalDayOrder(dateToName(past7Days[6]), testdata),
      }
   ]

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
         {loading || ordersLoading || usersLoading ? <Box>skeleton</Box> :
            <Box>
               <Container maxWidth="xl" sx={{ paddingY: "30px" }}>
                  <FeaturedInfo allData={allData.length} allOrders={orders.length} ingresos={TotalRevenue} monthTotal={thisMonthTotal} /> {/* pasar users length orders length products length y total de ventas */}
                  <Chart data={allDates} title="Ingresos de la ultima semana" grid dataKey="Total" weeklyIncome={thisWeekTotal} />
                  <Box className="homeWidgets">
                     <Grid container spacing={3}>
                        <WidgetSm users={allUsers.slice(-5).reverse()} />
                        <WidgetLg orderData={orders.slice(-5).reverse()} />
                     </Grid>
                  </Box>
               </Container>
            </Box>
         }
      </Box>
   )
}

export default DashboardHome


