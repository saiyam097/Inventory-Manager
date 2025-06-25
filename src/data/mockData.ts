import { Item, Review, User, DashboardStats } from '../types/Item';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'seller@example.com',
    role: 'seller',
    name: 'John Seller',
    companyName: 'Fashion Forward Co.'
  },
  {
    id: '2',
    email: 'buyer@example.com',
    role: 'buyer',
    name: 'Jane Buyer',
    age: 28,
    country: 'United States',
    gender: 'female'
  }
];

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    type: 'Shirt',
    category: 'clothing',
    description: 'A comfortable, breathable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a relaxed fit.',
    coverImage: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    additionalImages: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dateAdded: new Date('2024-01-15'),
    price: 29.99,
    rating: 4.5,
    ratingCount: 128,
    reviewCount: 95,
    purchaseCount: 342,
    monthlyPurchases: 45,
    sellerId: '1',
    sellerName: 'John Seller',
    companyName: 'Fashion Forward Co.'
  },
  {
    id: '2',
    name: 'Denim Jeans',
    type: 'Pant',
    category: 'clothing',
    description: 'Premium denim jeans with a modern slim fit. Features reinforced stitching and comfortable stretch fabric.',
    coverImage: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    additionalImages: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dateAdded: new Date('2024-01-10'),
    price: 79.99,
    rating: 4.2,
    ratingCount: 89,
    reviewCount: 67,
    purchaseCount: 198,
    monthlyPurchases: 23,
    sellerId: '1',
    sellerName: 'John Seller',
    companyName: 'Fashion Forward Co.'
  },
  {
    id: '3',
    name: 'Running Sneakers',
    type: 'Shoes',
    category: 'clothing',
    description: 'Lightweight running shoes with advanced cushioning technology. Perfect for daily runs and gym workouts.',
    coverImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    additionalImages: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dateAdded: new Date('2024-01-08'),
    price: 129.99,
    rating: 4.8,
    ratingCount: 256,
    reviewCount: 189,
    purchaseCount: 567,
    monthlyPurchases: 78,
    sellerId: '1',
    sellerName: 'John Seller',
    companyName: 'Fashion Forward Co.'
  },
  {
    id: '4',
    name: 'Tennis Racket',
    type: 'Sports Gear',
    category: 'sports',
    description: 'Professional-grade tennis racket with carbon fiber frame. Excellent control and power for competitive play.',
    coverImage: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=500',
    additionalImages: [
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dateAdded: new Date('2024-01-05'),
    price: 199.99,
    rating: 4.6,
    ratingCount: 74,
    reviewCount: 52,
    purchaseCount: 123,
    monthlyPurchases: 12,
    sellerId: '1',
    sellerName: 'John Seller',
    companyName: 'Fashion Forward Co.'
  },
  {
    id: '5',
    name: 'Luxury Face Cream',
    type: 'Skincare',
    category: 'beauty',
    description: 'Premium anti-aging face cream with natural ingredients. Reduces fine lines and improves skin texture.',
    coverImage: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
    additionalImages: [
      'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dateAdded: new Date('2024-01-12'),
    price: 89.99,
    rating: 4.7,
    ratingCount: 156,
    reviewCount: 134,
    purchaseCount: 289,
    monthlyPurchases: 34,
    sellerId: '1',
    sellerName: 'John Seller',
    companyName: 'Beauty Essentials Ltd.'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Jane Buyer',
    itemId: '1',
    rating: 5,
    comment: 'Excellent quality t-shirt! Very comfortable and fits perfectly. The fabric is soft and breathable.',
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    videos: [],
    dateAdded: new Date('2024-01-20'),
    helpful: 12
  },
  {
    id: '2',
    userId: '2',
    userName: 'Mike Johnson',
    itemId: '1',
    rating: 4,
    comment: 'Good quality shirt, though it runs a bit large. Great value for money.',
    images: [],
    videos: [],
    dateAdded: new Date('2024-01-18'),
    helpful: 8
  },
  {
    id: '3',
    userId: '2',
    userName: 'Sarah Wilson',
    itemId: '3',
    rating: 5,
    comment: 'Amazing running shoes! Very comfortable for long runs. Great cushioning and support.',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    videos: [],
    dateAdded: new Date('2024-01-12'),
    helpful: 15
  }
];

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 45678.90,
  totalSales: 1519,
  topSellingItems: [
    { itemId: '3', itemName: 'Running Sneakers', sales: 567, revenue: 73743.33, category: 'clothing' },
    { itemId: '1', itemName: 'Classic White T-Shirt', sales: 342, revenue: 10256.58, category: 'clothing' },
    { itemId: '5', itemName: 'Luxury Face Cream', sales: 289, revenue: 26007.11, category: 'beauty' },
    { itemId: '2', itemName: 'Denim Jeans', sales: 198, revenue: 15838.02, category: 'clothing' },
    { itemId: '4', itemName: 'Tennis Racket', sales: 123, revenue: 24598.77, category: 'sports' }
  ],
  categoryBreakdown: [
    { category: 'Clothing', sales: 1107, revenue: 99837.93 },
    { category: 'Beauty', sales: 289, revenue: 26007.11 },
    { category: 'Sports', sales: 123, revenue: 24598.77 }
  ],
  monthlyTrend: [
    { month: 'Jan', sales: 234, revenue: 18456.78 },
    { month: 'Feb', sales: 289, revenue: 22134.56 },
    { month: 'Mar', sales: 345, revenue: 27890.12 },
    { month: 'Apr', sales: 298, revenue: 24567.89 },
    { month: 'May', sales: 353, revenue: 29876.54 }
  ],
  demographics: {
    ageGroups: [
      { range: '18-25', count: 456 },
      { range: '26-35', count: 678 },
      { range: '36-45', count: 234 },
      { range: '46-55', count: 123 },
      { range: '55+', count: 89 }
    ],
    countries: [
      { country: 'United States', count: 567 },
      { country: 'Canada', count: 234 },
      { country: 'United Kingdom', count: 189 },
      { country: 'Australia', count: 156 },
      { country: 'Germany', count: 134 }
    ],
    genders: [
      { gender: 'Female', count: 789 },
      { gender: 'Male', count: 634 },
      { gender: 'Other', count: 96 }
    ]
  }
};