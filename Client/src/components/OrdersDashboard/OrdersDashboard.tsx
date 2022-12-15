import React, { useEffect, useState, useReducer } from 'react'
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Avatar
} from "@mui/material"
import { useAppDispatch, useAppSelector } from '../../assets/hooks'
import { getOrders } from '../../redux/thunk-actions/orderActions'
import s from "./OrdersDashboard.module.css"
import { StatusButton } from '../Dashboard/widgetLg/WidgetLg'
import DropperButton from './DropperButton'
import { formatNumber } from '../../assets/helpers'

const OrdersDashboard = () => {
    const dispatch = useAppDispatch()
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [search, setSearch] = useState<string>("")
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    const { ordersLoading, ordersError, orders } = useAppSelector(state => state.order)

    useEffect(() => {
        if (!orders.length) {
            dispatch(getOrders())
        }
    }, [])

    // Para cuando se cambia el estado de la orden 
    useEffect(() => {
        dispatch(getOrders())
    }, [reducerValue])

    const handlePagination = (event: any, newPage: number) => {
        setPage(newPage)
    }

    const handleRowsPerPage = (e: any) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(0)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(e.target.value)
    }

    return (
        <Box sx={{ backgroundColor: "#EBEFF3", display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Container maxWidth="xl" sx={{ paddingY: "30px" }}>
                <Box>
                    <Grid container sx={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", textAlign: "left", alignItems: "center" }}>
                        <Grid item md={4} xs={12}>
                            <Typography variant="h4">
                                Historial de compras
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginBottom: "1.45rem", backgroundColor: "white" }}>
                    <Box sx={{ padding: "1.3rem", borderBottom: "1px solid rgba(222, 226, 230, 0.7)" }}>
                        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid item md={3.5} xs={12}>
                                <TextField type="text" placeholder="Buscar por usuario..." size="small" name="name" fullWidth className={s.searchbar} onChange={e => handleSearch(e)} />
                            </Grid>
                            <Grid item md={1.5} xs={12}>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ padding: "1.3rem" }}>
                        <TableContainer component={Paper}>
                            <Table aria-label="orderHistory" >
                                <TableHead sx={{ backgroundColor: "#F7F8F9" }}>
                                    <TableRow>
                                        <TableCell>Usuario</TableCell>
                                        <TableCell>Precio total</TableCell>
                                        <TableCell>Metodo</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Accion</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders
                                        .filter((order) => order.user?.fullName.toLowerCase().includes(search.toLowerCase()))
                                        .reverse()
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(e =>
                                            <TableRow key={e._id}>
                                                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                                                    <Avatar src={e.user?.image ? e.user.image : ""} sx={{ marginRight: "15px" }} />
                                                    {e.user?.fullName ? e.user.fullName : "Usuario eliminado"}
                                                </TableCell>
                                                <TableCell>{`$${formatNumber(e.totalPrice)}`}</TableCell>
                                                <TableCell>{`${e.paymentMethod === "Credit Card" ? "Tarjeta de credito" : e.paymentMethod}`}</TableCell>
                                                <TableCell>{`${e.createdAt.split("T")[0].split("-").reverse().join(".")}, ${e.createdAt.split("T")[1].slice(0, 5)}`}</TableCell>
                                                <TableCell>
                                                    {!e.isDelivered ? <StatusButton type="Pendiente" />
                                                        : <StatusButton type="Aprobado" />
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <DropperButton orderId={e._id} isPaid={e.isPaid} forceUpdate={forceUpdate} />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                labelRowsPerPage="Items por pagina"
                                rowsPerPageOptions={[10, 30, 50]}
                                component="div"
                                count={orders.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handlePagination}
                                onRowsPerPageChange={handleRowsPerPage}
                            />
                        </TableContainer>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default OrdersDashboard