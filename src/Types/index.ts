export interface User {
  id: string;
  products?: (string | Product)[] | null;
  product_files?: (string | ProductFile)[] | null;
  role: "admin" | "user";
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface Product {
  id: string;
  user?: (string | null) | User;
  name: string;
  image: string;
  title: string;
  description?: string | null;
  price: number;
  category: "ui_kits" | "icons";
  product_files: string | ProductFile;
  approvedForSale?: ("pending" | "approved" | "denied") | null;
  priceId?: string | null;
  stripeId?: string | null;
  images: {
    image: string | Media;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
export interface ProductFile {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}

export interface Media {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
