import { Item } from '../types/Item';

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    type: 'Shirt',
    description: 'A comfortable, breathable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a relaxed fit.',
    coverImage: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    additionalImages: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dateAdded: new Date('2024-01-15'),
    price: 29.99,
    rating: 4.5,
    ratingCount: 128
  },
  {
    id: '2',
    name: 'Denim Jeans',
    type: 'Pant',
    description: 'Premium denim jeans with a modern slim fit. Features reinforced stitching and comfortable stretch fabric.',
    coverImage: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    additionalImages: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dateAdded: new Date('2024-01-10'),
    price: 79.99,
    rating: 4.2,
    ratingCount: 89
  },
  {
    id: '3',
    name: 'Running Sneakers',
    type: 'Shoes',
    description: 'Lightweight running shoes with advanced cushioning technology. Perfect for daily runs and gym workouts.',
    coverImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    additionalImages: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dateAdded: new Date('2024-01-08'),
    price: 129.99,
    rating: 4.8,
    ratingCount: 256
  },
  {
    id: '4',
    name: 'Tennis Racket',
    type: 'Sports Gear',
    description: 'Professional-grade tennis racket with carbon fiber frame. Excellent control and power for competitive play.',
    coverImage: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=500',
    additionalImages: [
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dateAdded: new Date('2024-01-05'),
    price: 199.99,
    rating: 4.6,
    ratingCount: 74
  }
];