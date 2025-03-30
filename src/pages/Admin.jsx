import React, { useState } from 'react';
import Navbar from '../Components/Dashboard/Navbar';
import StatsCards from '../Components/Dashboard/StatsCards';
import SalesChart from '../Components/Dashboard/SalesChart';
import ProductsTable from '../Components/Dashboard/ProductsTable';
import UsersTable from '../Components/Dashboard/UsersTable';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 px-4">
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SalesChart />
          <ProductsTable />
        </div>
        <UsersTable />
      </div>
    </div>
  );
}

export default App;