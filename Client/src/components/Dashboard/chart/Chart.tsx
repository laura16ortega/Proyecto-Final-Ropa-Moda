import "./chart.css"
import { LineChart, Line, XAxis,  CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography, Paper } from "@mui/material"

export default function Chart({title, data, dataKey, grid}:any) {

  return (
    <Paper elevation={5}>
    <Box className="chart">
        <Typography variant="h5" className="chartTitle">{title}</Typography>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#5550bd"/> {/* dataKey == name del dummy data */}
                <Line type="monotone" dataKey={dataKey} stroke="#5550bd"/> {/* datakey active user */}
                <Tooltip />
                {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
            </LineChart>
        </ResponsiveContainer>
    </Box>
    </Paper>
  )
}
