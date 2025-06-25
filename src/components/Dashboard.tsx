import React from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Users, Globe, PieChart } from 'lucide-react';
import { DashboardStats, User } from '../types/Item';

interface DashboardProps {
  stats: DashboardStats;
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, user }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user.name}</p>
          {user.companyName && (
            <p className="text-blue-400 font-medium">{user.companyName}</p>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-600/20 p-3 rounded-lg border border-green-500/30">
              <DollarSign className="text-green-400" size={24} />
            </div>
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ${stats.totalRevenue.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Revenue</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-500/30">
              <ShoppingBag className="text-blue-400" size={24} />
            </div>
            <TrendingUp className="text-blue-400" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {stats.totalSales.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Sales</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
              <BarChart3 className="text-purple-400" size={24} />
            </div>
            <TrendingUp className="text-purple-400" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {stats.topSellingItems.length}
          </h3>
          <p className="text-gray-400 text-sm">Active Products</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-600/20 p-3 rounded-lg border border-orange-500/30">
              <Users className="text-orange-400" size={24} />
            </div>
            <TrendingUp className="text-orange-400" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {stats.demographics.ageGroups.reduce((sum, group) => sum + group.count, 0)}
          </h3>
          <p className="text-gray-400 text-sm">Total Customers</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Products */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="mr-3 text-blue-400" size={24} />
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {stats.topSellingItems.map((item, index) => (
              <div key={item.itemId} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-blue-500/30">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.itemName}</p>
                    <p className="text-gray-400 text-sm">{item.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">${item.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <PieChart className="mr-3 text-purple-400" size={24} />
            Category Performance
          </h3>
          <div className="space-y-4">
            {stats.categoryBreakdown.map((category, index) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'];
              const percentage = (category.sales / stats.totalSales * 100).toFixed(1);
              
              return (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{category.category}</span>
                    <span className="text-gray-400">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{category.sales} sales</span>
                    <span>${category.revenue.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Age Groups */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Users className="mr-2 text-blue-400" size={20} />
            Age Groups
          </h3>
          <div className="space-y-3">
            {stats.demographics.ageGroups.map((group, index) => (
              <div key={group.range} className="flex justify-between items-center">
                <span className="text-gray-300">{group.range}</span>
                <span className="text-blue-400 font-medium">{group.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Countries */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Globe className="mr-2 text-green-400" size={20} />
            Top Countries
          </h3>
          <div className="space-y-3">
            {stats.demographics.countries.slice(0, 5).map((country, index) => (
              <div key={country.country} className="flex justify-between items-center">
                <span className="text-gray-300">{country.country}</span>
                <span className="text-green-400 font-medium">{country.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Users className="mr-2 text-purple-400" size={20} />
            Gender Distribution
          </h3>
          <div className="space-y-3">
            {stats.demographics.genders.map((gender, index) => (
              <div key={gender.gender} className="flex justify-between items-center">
                <span className="text-gray-300 capitalize">{gender.gender}</span>
                <span className="text-purple-400 font-medium">{gender.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="mr-3 text-green-400" size={24} />
          Monthly Sales Trend
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {stats.monthlyTrend.map((month, index) => (
            <div key={month.month} className="text-center">
              <div className="bg-gray-700 rounded-lg p-4 mb-2">
                <div 
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg mx-auto transition-all duration-500"
                  style={{ 
                    height: `${(month.sales / Math.max(...stats.monthlyTrend.map(m => m.sales))) * 100}px`,
                    minHeight: '20px',
                    width: '20px'
                  }}
                />
              </div>
              <p className="text-gray-400 text-sm">{month.month}</p>
              <p className="text-white font-medium">{month.sales}</p>
              <p className="text-green-400 text-xs">${month.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;