import React from 'react';
import { Card, Text, Title } from '@tremor/react';
import { Users, Package, DollarSign, ShoppingCart } from 'lucide-react';

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-pink-100 mr-4">
            <DollarSign className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <Text>Total Revenue</Text>
            <Title>$24,567</Title>
          </div>
        </div>
      </Card>
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <Text>Total Users</Text>
            <Title>1,234</Title>
          </div>
        </div>
      </Card>
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <ShoppingCart className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <Text>Total Orders</Text>
            <Title>856</Title>
          </div>
        </div>
      </Card>
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <Text>Products</Text>
            <Title>432</Title>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default StatsCards;