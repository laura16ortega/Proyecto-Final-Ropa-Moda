import "./widgetLg.css"
import {
  Typography,
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Card,
  Avatar
} from "@mui/material"
import { OrderType } from "../../../redux/types/orderTypes"

type WidgetLgProps = {
  orderData: OrderType[]
}

export const StatusButton = ({ type }: any) => {
  return <button className={"widgetLgButton " + type}>{type}</button>
}

export default function WidgetLg({ orderData }: WidgetLgProps) {

  return (
    <Grid item xs={12} lg={7.5}>
      <Paper elevation={5} sx={{ backgroundColor: "white", padding: "20px" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Últimos Informes</Typography>
        <TableContainer component={Card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Clientes</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((e, i) =>
                <TableRow key={i}>
                  <TableCell sx={{display: "flex", alignItems: "center"}}>
                    <Avatar src={e.user.image} sx={{marginRight: "15px"}}/>
                    {e.user.fullName}
                  </TableCell>
                  <TableCell>{`${new Date(e.createdAt).toLocaleString()}`}</TableCell>
                  <TableCell>{`$${e.totalPrice}.0`}</TableCell>
                  <TableCell>
                    {!e.isDelivered ? <StatusButton type="Pendiente" />
                      : <StatusButton type="Aprobado" />
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  )
}




{/* <td className="widgetLgUser">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
<span className="widgetLgName">Susan Carol</span>
</td>
<td className="widgetLgFecha">2 Jun 2022</td>
<td className="widgetLgCantidad">$122.0</td>
<td className="widgetLgEstado"><Button type="Declined"/>
</td>      
<td className="widgetLgUser">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
<span className="widgetLgName">Susan Carol</span>
</td>
<td className="widgetLgFecha">2 Jun 2022</td>
<td className="widgetLgCantidad">$122.0</td>
<td className="widgetLgEstado"><Button type="Pending"/>
</td> 
<td className="widgetLgUser">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
<span className="widgetLgName">Susan Carol</span>
</td>
<td className="widgetLgFecha">2 Jun 2022</td>
<td className="widgetLgCantidad">$122.0</td>
<td className="widgetLgEstado"><Button type="Approved"/>
</td>      */}