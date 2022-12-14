import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import { Box, Typography, Grid, Link, Paper } from "@mui/material"
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Precio total
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Cantidad de ordenes
import CheckroomIcon from '@mui/icons-material/Checkroom'; // Cantidad de productos
import SellIcon from '@mui/icons-material/Sell'; // Precio del mes

type FeaturedProps = {
    allData: number
    allOrders: number
    allUsers?: number
    ingresos: number
    monthTotal: number
}

export default function FeaturedInfo({ allData, allOrders, ingresos, monthTotal }: FeaturedProps) {
    return (
        <Box className='featured'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper elevation={3}>
                        <Box sx={{ padding: "20px", borderRadius: "10px", overflow: "hidden", border: "1px solid #eee" }}>
                            <Box sx={{ display: "flex" }}>
                                <MonetizationOnIcon sx={{ fontSize: 45, marginRight: "15px", backgroundColor: "rgba(8, 129, 120, 0.2)", padding: "4px", borderRadius: 9999, color: "#088178" }} />
                                <Box sx={{ textAlign: "left" }}>
                                    <Typography variant="h6" sx={{ marginBottom: ".3rem" }}>Ingresos totales</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: ".9rem" }}>{`$${ingresos}`}</Typography>
                                    <Typography variant="subtitle2" sx={{color: "gray"}}>Impuestos de envio no incluidos</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper elevation={3}>
                        <Box sx={{ padding: "20px", borderRadius: "10px", overflow: "hidden", border: "1px solid #eee" }}>
                            <Box sx={{ display: "flex" }}>
                                <LocalShippingIcon sx={{ fontSize: 45, marginRight: "15px", backgroundColor: "rgba(0, 181, 23, 0.2)", padding: "6px", borderRadius: 9999, color: "#00B517" }} />
                                <Box sx={{ textAlign: "left" }}>
                                    <Typography variant="h6" sx={{ marginBottom: ".3rem" }}>Ordenes</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: ".9rem" }}>{allOrders}</Typography>
                                    <Typography variant="subtitle2"><Link href="actas">Ver detalles</Link></Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper elevation={3}>
                        <Box sx={{ padding: "20px", borderRadius: "10px", overflow: "hidden", border: "1px solid #eee" }}>
                            <Box sx={{ display: "flex" }}>
                                <CheckroomIcon sx={{ fontSize: 45, marginRight: "15px", backgroundColor: "rgba(253, 138, 20, 0.2)", padding: "5px", borderRadius: 9999, color: "#fd8a14" }} />
                                <Box sx={{ textAlign: "left" }}>
                                    <Typography variant="h6" sx={{ marginBottom: ".3rem" }}>Productos</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: ".9rem" }}>{allData}</Typography>
                                    <Typography variant="subtitle2"><Link href="products">Ver detalles</Link></Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid >
                <Grid item xs={12} md={6} lg={3}>
                    <Paper elevation={3}>
                        <Box sx={{ padding: "20px", borderRadius: "10px", overflow: "hidden", border: "1px solid #eee" }}>
                            <Box sx={{ display: "flex" }}>
                                <SellIcon sx={{ fontSize: 45, marginRight: "15px", backgroundColor: "rgba(13, 202, 140, 0.2)", padding: "7px", borderRadius: 9999, color: "#0dcaf0" }} />
                                <Box sx={{ textAlign: "left" }}>
                                    <Typography variant="h6" sx={{ marginBottom: ".3rem" }}>Ingresos del mes</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: ".9rem" }}>{`$${monthTotal}`}</Typography>
                                    <Typography variant="subtitle2"><Link>Ver detalles</Link></Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid >
        </Box >
    )
}

// pasar a revenue, cantidad de ordenes, products y usuarios <<-- todo .length
// monthly earning


/*
<Box className="featuredItem">
    <Typography variant="h6" className="featuredTitle">
        Ingresos
    </Typography>
    <Box className="featuredMoneyContainer">
        <Typography variant="h4" className="featuredMoney">$2,415</Typography>
        <Typography variant="subtitle1" className="featuredMoneyRate">
            -11.5
            <ArrowDownward className="featuredIcon negative" />
        </Typography>
    </Box>
    <Typography variant="subtitle2" className="featuredSub">En comparación con el mes pasado</Typography>
</Box>
<Box className="featuredItem">
    <Typography variant="h6" className="featuredTitle">
        Ventas
    </Typography>
    <Box className="featuredMoneyContainer">
        <Typography variant="h4" className="featuredMoney">$4,415</Typography>
        <Typography variant="subtitle1" className="featuredMoneyRate">
            -1.5
            <ArrowDownward className="featuredIcon negative" />
        </Typography>
    </Box>
    <Typography variant="subtitle2" className="featuredSub">En comparación con el mes pasado</Typography>
</Box>
<Box className="featuredItem">
    <Typography variant="h6" className="featuredTitle">
        Costo
    </Typography>
    <Box className="featuredMoneyContainer">
        <Typography variant="h4" className="featuredMoney">$2,225</Typography>
        <Typography variant="subtitle1" className="featuredMoneyRate">
            +2.5
            <ArrowUpward className="featuredIcon" />
        </Typography>
    </Box>
    <Typography variant="subtitle2" className="featuredSub">En comparación con el mes pasado</Typography>
</Box>
*/