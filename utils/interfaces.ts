import { UUID } from "crypto";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  owner_id: string;
  likes: number;
  dislikes: number;
  views: number;
  total_likes: number;
  total_dislikes: number;
  user_vote_type: string;
  created_at: string;
  updated_at: string;
}

export interface Premium {
  [key: string]: {
    title: string;
    heading: string;
    benefits: string[];
    book: string;
    only: string;
  };
}

export interface Header {
  nav: { [key: string]: string }[];
  lang: string[];
}

export interface Footer {
  nav: { [key: string]: string }[];
  copy: string;
  terms: string;
  privacy: string;
  newsletter: string;
  subscribe: string;
}

export interface Products {
  search: string;
  heading: string;
  sort: {
    heading: string;
    options: string[];
  };
  addToCart: string;
  seeMore: string;
  categories: string;
  addNewReview: string;
  submit: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  uploadImage: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountpercentage: number;
  brand: string;
  category: string;
  image: string;
  images: string[];
  owner_id: string;
  rating: string;
}

export interface Main {
  products: Products;
  blog: {
    [key: string]: string;
  };
  contact: {
    [key: string]: string;
  };
  premium: Premium;
  profile: {
    [key: string]: string;
  };
  admin: {
    [key: string]: string;
  };
  addNewPost: {
    [key: string]: string;
  };
  addNewProduct: {
    [key: string]: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  age: number | null;
  role: string;
}

export interface Order {
  order_id: UUID;
  title: string;
  price: number;
  created_at: Date;
}
