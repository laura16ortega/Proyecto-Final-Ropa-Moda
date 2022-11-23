import Container  from "@mui/material/Container";
import Grid  from "@mui/material/Grid";
import Box  from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function Footer () {
    return <footer>
        <Box px={{ xs: 5, sm: 10}}
        py={{ xs: 10, sm:10}}
        bgcolor="text.secondary" color="white">
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={3}>
                        <Box borderBottom={1}>Ayuda</Box>
                        <Box>
                            <Link href="/" color="inherit">
                                Contacto
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                                Soporte
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                               Privacidad
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Cuenta</Box>
                        <Box>
                            <Link href="/" color="inherit">
                               Acceso
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                               Registro
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Mensajes</Box>
                        <Box>
                            <Link href="/" color="inherit">
                               Respaldo
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                               Historia
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                                Lista
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{xs: 5, sm: 10}} pb={{xs: 5, sm:0}}>
                     Ropa/Moda &reg; {new Date().getFullYear()}
                </Box>
            </Container>
        </Box>
    </footer>
}







