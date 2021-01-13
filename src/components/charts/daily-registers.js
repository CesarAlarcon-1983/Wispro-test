import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { generateChartData } from '../../services/users.service';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function DailyRegistersChart() {
  const [chartData, setChartData] = useState(generateChartData(30));
  let ws = new WebSocket('wss://echo.websocket.org');

  ws.onopen = () => {
    setInterval(() => {
      ws.send('update values')
    }, 5000);
  }

  useEffect(() => {
    ws.onmessage = () => {
      setChartData(generateChartData(30));
    }
  }, []);
  

  ws.onclose = () => {
    console.log('closed')
  }

  ws.onerror = e => {
    console.log('error', e)
    debugger;
  }

  return(
    <motion.div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart 
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCantidad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="dia" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="cantidad" stroke="#8884d8" fillOpacity={1} fill="url(#colorCantidad)" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}