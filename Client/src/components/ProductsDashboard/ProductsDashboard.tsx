import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Button, Link, TextField, Select, MenuItem, SelectChangeEvent, Paper } from "@mui/material"
import s from "./ProductDashboard.module.css"
import { useAppDispatch, useAppSelector } from '../../assets/hooks'
import { deleteProduct, getAllProducts } from '../../redux/thunk-actions/testActions'
import { sortProducts } from '../../redux/slices/testSlice'
import Pagination from '../Pagination/Pagination'
import { useNotification } from '../UseNotification/UseNotification'

const ProductsDashboard = () => {
    const [filters, setFilters] = useState<any>({
        name: "",
        sort: ""
    })
    const [pagina, setPagina] = useState(1)
    const dispatch = useAppDispatch()
    const { allData, deleteLoading } = useAppSelector(state => state.data)
    const { displayNotification } = useNotification()

    useEffect(() => {
        if (deleteLoading) {
            dispatch(getAllProducts())
            setTimeout(() => {
                displayNotification({ message: "Producto eliminado con exito", type: "success" })
            }, 500);
        }
        dispatch(getAllProducts())
    }, [deleteLoading])

    let maximo = allData.length / 10

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
        allData.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase()))
    }

    const handleSort = (e: SelectChangeEvent<string>) => {
        setFilters({
            ...filters,
            sort: e.target.value
        })
        dispatch(sortProducts(e.target.value))
    }

    const handleDelete = (productId: string) => {
        dispatch(deleteProduct(productId))
    }

    return (
        <Box sx={{ backgroundColor: "#EBEFF3", display: "flex", flex: 1 }}>
            <Container maxWidth="xl" sx={{ paddingY: "30px" }}>
                <Box>
                    <Grid container sx={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", textAlign: "left", alignItems: "center" }}>
                        <Grid item md={4} xs={12}>
                            <Typography variant="h4">
                                Lista de productos
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={12} sx={{ textAlign: "right" }}>
                            <Button variant="contained" disableElevation sx={{ padding: 0 }}>
                                <Link href="/create" color="secondary" sx={{padding: "10px 15px"}}>
                                    Agregar
                                </Link>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginBottom: "1.45rem", backgroundColor: "white" }}>
                    <Box sx={{ padding: "1.3rem", borderBottom: "1px solid rgba(222, 226, 230, 0.7)" }}>
                        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid item md={3.5} xs={12}>
                                <TextField type="text" placeholder="Buscar..." size="small" name="name" value={filters.name} fullWidth className={s.searchbar} onChange={e => handleSearch(e)} />
                            </Grid>
                            <Grid item md={1.5} xs={12}>
                                <Select displayEmpty defaultValue="default" className={s.selector} onChange={e => handleSort(e)}>
                                    <MenuItem value="default">Default</MenuItem>
                                    <MenuItem value="PriceDESC">Precio descendente</MenuItem>
                                    <MenuItem value="PriceASC">Precio ascendente</MenuItem>
                                    <MenuItem value="Rating">Rating</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ padding: "1.3rem" }}>
                        <Grid container alignItems="stretch">
                            {allData.filter((product) => 
                            product.name.toLowerCase().includes(filters.name.toLowerCase())
                            ).slice(
                                (pagina - 1) * 10,
                                (pagina - 1) * 10 + 10).map((e, i) =>
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} sx={{ paddingX: "8px" }} key={e._id}>
                                        <Paper>
                                            <Box sx={{ border: "1px solid #eee", marginBottom: "20px", borderRadius: "10px", overflow: "hidden"}}>
                                                <Box>
                                                    <Link href={`/products/${e._id}`}>
                                                        <img src={!e.images? "" : e.images.public_id ? e.images.public_id : e.images[0]} alt="" style={{ height: "100%", maxWidth: "100%", objectFit: "cover" }} />
                                                    </Link>
                                                </Box>
                                                <Box sx={{ padding: "1rem", textAlign: "left" }}>
                                                    <Typography variant="h6" sx={{ color: "#6c757d", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                        {e.name}
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ marginBottom: ".5rem" }}>
                                                        {`$${e.price}`}
                                                    </Typography>
                                                    <Box sx={{ marginTop: "1rem", display: "flex", justifyContent: "space-evenly" }}>
                                                        <Button variant="outlined" disableElevation size="small">
                                                            <Link href={`/dashboard/editProduct/${e._id}`} >
                                                                Editar
                                                            </Link>
                                                        </Button>
                                                        <Button variant="outlined" disableElevation size="small" onClick={() => handleDelete(e._id)}>
                                                            Borrar
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Box>
                </Box>
                <Box>
                    <Pagination
                        maximo={maximo}
                        pagina={pagina}
                        setPagina={setPagina}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default ProductsDashboard