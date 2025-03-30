import React from 'react';
import { Card, Title, AreaChart } from '@tremor/react';

const chartdata = [
  { date: "Jan 23", Sales: 2890, Stock: 2400 },
  { date: "Feb 23", Sales: 2756, Stock: 1398 },
  { date: "Mar 23", Sales: 3322, Stock: 2400 },
  { date: "Apr 23", Sales: 3470, Stock: 2800 },
  { date: "May 23", Sales: 3475, Stock: 3100 },
  { date: "Jun 23", Sales: 3129, Stock: 3500 },
];

function SalesChart() {
  return (
    <Card>
      <Title>Sales vs Stock Overview</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata}
        index="date"
        categories={["Sales", "Stock"]}
        colors={["pink", "indigo"]}
      />
    </Card>
  );
}

export default SalesChart;