import { Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Jan", transactions: 5 },
  { name: "Feb", transactions: 9 },
  { name: "Mar", transactions: 7 },
  { name: "Apr", transactions: 10 },
];

export default function ChartPage() {
  return (
    <Card sx={{ m: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Transaction Trends
        </Typography>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="transactions" stroke="#1976d2" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
