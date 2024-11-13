import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Sensores {
  id: number;
  temperatura: number;
  ax: number;
  ay: number;
  presion: number;
  momento: string;
}
function App() {
  const [sensores, setSensores] = React.useState<Sensores[]>([]);

  async function loadSensores() {
    const sensores = await axios.get("http://localhost:8000/sensores");
    setSensores(sensores.data);
  }

  useEffect(() => {
    loadSensores();
    const interval = setInterval(() => {
      loadSensores();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Hola</h1>
      <ResponsiveContainer width={1000} height={500}>
        <LineChart
          width={500}
          height={300}
          data={sensores}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="momento" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="temperatura" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
