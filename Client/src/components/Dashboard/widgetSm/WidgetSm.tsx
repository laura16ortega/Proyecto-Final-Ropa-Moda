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
} from "@mui/material"

type UsersData = {
    users: any // users.slice >>> map
}

export default function WidgetSm() {
    return (
        <Grid item xs={12} lg={4.5}>
            <Paper elevation={5} sx={{ backgroundColor: "white", padding: "20px" }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Nuevos Miembros</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" /></TableCell>
                                <TableCell align="center">Hellen Keller</TableCell>
                                <TableCell align="center">
                                    <Button className="widgetSmButton">
                                        <Visibility />
                                        Display
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" /></TableCell>
                                <TableCell align="center">Hellen Keller</TableCell>
                                <TableCell align="center">
                                    <Button className="widgetSmButton">
                                        <Visibility />
                                        Display
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" /></TableCell>
                                <TableCell align="center">Hellen Keller</TableCell>
                                <TableCell align="center">
                                    <Button className="widgetSmButton">
                                        <Visibility />
                                        Display
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" /></TableCell>
                                <TableCell align="center">Hellen Keller</TableCell>
                                <TableCell align="center">
                                    <Button className="widgetSmButton">
                                        <Visibility />
                                        Display
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" /></TableCell>
                                <TableCell align="center">Hellen Keller</TableCell>
                                <TableCell align="center">
                                    <Button className="widgetSmButton">
                                        <Visibility />
                                        Display
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" /></TableCell>
                                <TableCell align="center">Hellen Keller</TableCell>
                                <TableCell align="center">
                                    <Button className="widgetSmButton">
                                        <Visibility />
                                        Display
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    )
}
