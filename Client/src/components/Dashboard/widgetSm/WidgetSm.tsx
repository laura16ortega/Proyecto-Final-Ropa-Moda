import "./widgetSm.css"
import { Visibility } from '@mui/icons-material'
import {
    Typography,
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    Button,
    TableRow,
    Grid,
    Avatar
} from "@mui/material"


type UsersData = {
    users: any // users.slice >>> map
}

export default function WidgetSm({users}: UsersData) {

    return (
            <Grid item xs={12} lg={4.5}>
                <Paper elevation={5} sx={{ backgroundColor: "white", padding: "20px"}}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>Nuevos Miembros</Typography>
                    <TableContainer sx={{overflow: "hidden"}}>
                        <Table>
                            <TableBody>
                                {users?.map((u: any, i: any) =>
                                    <TableRow key={i + 1}>
                                        <TableCell align="center"><Avatar src={u.image} alt="" /></TableCell>
                                        <TableCell>{u.fullName}</TableCell>
                                        <TableCell align="center">
                                            {`${new Date(u.createdAt).toLocaleString().split(",")[0]}`}
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
