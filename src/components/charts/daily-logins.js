import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { generateChartData } from '../../services/users.service';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function DailyLoginChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(generateChartData(30));
  }, []);

  return(
    <motion.div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart 
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="dia" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}