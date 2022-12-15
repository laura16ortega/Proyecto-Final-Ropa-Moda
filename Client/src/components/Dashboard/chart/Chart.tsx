import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography, Paper } from "@mui/material"
import { formatNumber } from "../../../assets/helpers";

export default function Chart({ title, data, dataKey, grid, weeklyIncome }: any) {

  return (
    <Paper elevation={5}>
      <Box className="chart">
        <Typography variant="h5" className="chartTitle">{title}</Typography>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#5550bd" />
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
        <Typography variant="h6" sx={{ textAlign: "right", paddingX: "2rem", fontWeight: "600", color: "gray" }}>{`Total: $${formatNumber(weeklyIncome)}`}</Typography>
      </Box>
    </Paper>
  )
}
