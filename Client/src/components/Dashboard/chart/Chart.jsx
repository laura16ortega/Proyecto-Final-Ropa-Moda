import "./chart.css"
import { LineChart, Line, XAxis,  CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import AllUsers from "../AllUsers/AllUsers";
export default function Chart({title, data, dataKey, grid}) {

  return (
    <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#5550bd"/>
                <Line type="monotone" dataKey={dataKey} stroke="#5550bd"/>
                <Tooltip />
                
                {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}



// {
//     name: 'Page B',
//     "Active User": 3000,
  
//   },
//   {
//     name: 'Page C',
//     "Active User": 2000,

//   },
//   {
//     name: 'Page D',
//     "Active User": 2780,

//   },
//   {
//     name: 'Page E',
//     "Active User": 1890,

//   },
//   {
//     name: 'Page F',
//     "Active User": 2390,

//   },
//   {
//     name: 'Page G',
//     "Active User": 3490,

//   },