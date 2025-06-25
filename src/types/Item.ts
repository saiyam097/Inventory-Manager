export interface User {
  id: string;
  email: string;
  role: 'buyer' | 'seller';
  name: string;
  companyName?: string;
  age?: number;
  country?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  itemId: string;
  rating: number;
  comment: string;
  images: string[];
  videos: string[];
  dateAdded: Date;
  helpful: number;
}

export interface Item {
  id: string;
  name: string;
  type: string;
  category: 'clothing' | 'beauty' | 'electronics' | 'sports' | 'home' | 'books' | 'toys' | 'other';
  description: string;
  coverImage: string;
  additionalImages: string[];
  dateAdded: Date;
  price: number;
  rating: number;
  ratingCount: number;
  reviewCount: number;
  purchaseCount: number;
  monthlyPurchases: number;
  userRating?: number;
  sellerId: string;
  sellerName: string;
  companyName: string;
}

export interface ItemFormData {
  name: string;
  type: string;
  category: 'clothing' | 'beauty' | 'electronics' | 'sports' | 'home' | 'books' | 'toys' | 'other';
  description: string;
  price: number;
  coverImage: File | null;
  additionalImages: File[];
  companyName: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  coverImage: string;
  quantity: number;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
  images: File[];
  videos: File[];
}

export interface SalesData {
  itemId: string;
  itemName: string;
  sales: number;
  revenue: number;
  category: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalSales: number;
  topSellingItems: SalesData[];
  categoryBreakdown: { category: string; sales: number; revenue: number }[];
  monthlyTrend: { month: string; sales: number; revenue: number }[];
  demographics: {
    ageGroups: { range: string; count: number }[];
    countries: { country: string; count: number }[];
    genders: { gender: string; count: number }[];
  };
}