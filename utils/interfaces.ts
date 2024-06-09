export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  owner_id: string;
  likes: number;
  dislikes: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Premium {
  [key: string]: {
    heading: string;
    benefits: { name: string; available: boolean }[];
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
}

export interface Main {
  products: Products;
  about: {
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
