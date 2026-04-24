export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  videoUrl: string;
  posterUrl: string;
  likes: string;
  shares: string;
  comments: string;
}
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    description: "Experience studio-quality sound with our latest noise-cancelling technology. Perfect for travelers and music lovers.",
    price: 299.99,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-and-listening-to-music-with-headphones-42445-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    likes: "12.4K",
    shares: "1.2K",
    comments: "856"
  },
  {
    id: "2",
    title: "Minimalist Smart Watch",
    description: "The perfect blend of style and functionality. Track your health, notifications, and more in a sleek aluminum casing.",
    price: 199.50,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-downward-view-3456-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    likes: "8.2K",
    shares: "450",
    comments: "320"
  },
  {
    id: "3",
    title: "Organic Skincare Set",
    description: "Glow naturally with our 100% organic facial routine. Dermatologist tested for all skin types.",
    price: 85.00,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-80-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop",
    likes: "25.1K",
    shares: "5.6K",
    comments: "2.1K"
  }
];