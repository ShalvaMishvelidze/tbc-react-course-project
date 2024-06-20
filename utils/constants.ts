import { Footer, Header, Main } from "./interfaces";

interface Libraries {
  [key: string]: {
    auth: {
      [key: string]: string;
    };
    header: Header;
    main: Main;
    footer: Footer;
  };
}

const auth_en = {
  username: "username",
  email: "email",
  password: "password",
  login: "log in",
  register: "register",
  user: "user",
  admin: "admin",
  loginMsg: "don't have an account yet?",
  registerMsg: "already have an account?",
};
const auth_ka = {
  username: "სახელი",
  email: "იმეილი",
  password: "პაროლი",
  login: "შესვლა",
  register: "რეგისტრაცია",
  user: "მომხმარებელი",
  admin: "ადმინისტრატორი",
  loginMsg: "ჯერ არ გაქვთ ანგარიში?",
  registerMsg: "უკვე გაქვთ ანგარიში?",
};

const header_en = {
  nav: [
    { text: "home", href: "/" },
    { text: "about", href: "/about" },
    { text: "blog", href: "/blog" },
    { text: "contact", href: "/contact" },
    { text: "premium", href: "/premium" },
    { text: "profile", href: "/profile" },
    { text: "admin", href: "/admin" },
  ],
  lang: ["en", "ka"],
};
const header_ka = {
  nav: [
    { text: "მთავარი", href: "/" },
    { text: "ჩვენს შესახებ", href: "/about" },
    { text: "ბლოგი", href: "/blog" },
    { text: "კონტაქტი", href: "/contact" },
    { text: "პრემიუმი", href: "/premium" },
    { text: "პროფილი", href: "/profile" },
    { text: "ადმინისტრატორი", href: "/admin" },
  ],
  lang: ["en", "ka"],
};

const products_en = {
  search: "search for products",
  heading: "products",
  sort: {
    heading: "sort",
    options: ["a-z", "z-a", "price asc", "price dec"],
  },
  addToCart: "add to cart",
};
const products_ka = {
  search: "გთხოვთ შეიყვანოთ რას ეძებთ",
  heading: "პროდუქტები",
  sort: {
    heading: "დალაგება",
    options: ["ა-ჰ", "ჰ-ა", "ფასის ზრდით", "ფასის კლებით"],
  },
  addToCart: "კალათში დამატება",
};

const contact_en = {
  heading: "contact us",
  formHeading: "contact form",
  name: "Name",
  email: "Email",
  message: "Message",
  submit: "Submit",
};

const contact_ka = {
  heading: "დაგვიკავშირდით",
  formHeading: "საკონტაქტო ფორმა",
  name: "სახელი",
  email: "იმეილი",
  message: "შეტყობინება",
  submit: "გაგზავნა",
};

const premium_en = {
  monthly: {
    heading: "monthly",
    benefits: [
      { name: "first benefit", available: true },
      { name: "second benefit", available: true },
      { name: "third benefit", available: true },
      { name: "fourth benefit", available: true },
      { name: "fifth benefit", available: false },
      { name: "sixth benefit", available: false },
    ],
  },
  yearly: {
    heading: "yearly",
    benefits: [
      { name: "first benefit", available: true },
      { name: "second benefit", available: true },
      { name: "third benefit", available: true },
      { name: "fourth benefit", available: true },
      { name: "fifth benefit", available: true },
      { name: "sixth benefit", available: true },
    ],
  },
};
const premium_ka = {
  monthly: {
    heading: "ყოველთვიური",
    benefits: [
      { name: "პირველი შეთავაზება", available: true },
      { name: "მეორე შეთავაზება", available: true },
      { name: "მესამე შეთავაზება", available: true },
      { name: "მეოთხე შეთავაზება", available: true },
      { name: "მეხუთე შეთავაზება", available: false },
      { name: "მეექვსე შეთავაზება", available: false },
    ],
  },
  yearly: {
    heading: "ყოველწლიური",
    benefits: [
      { name: "პირველი შეთავაზება", available: true },
      { name: "მეორე შეთავაზება", available: true },
      { name: "მესამე შეთავაზება", available: true },
      { name: "მეოთხე შეთავაზება", available: true },
      { name: "მეხუთე შეთავაზება", available: true },
      { name: "მეექვსე შეთავაზება", available: true },
    ],
  },
};

const profile_en = {
  heading: "profile",
  name: "Name",
  lastName: "Last name",
  email: "Email",
  password: "New Password",
  confirmPassword: "Confirm Password",
  save: "save changes",
};

const profile_ka = {
  heading: "პროფილი",
  name: "სახელი",
  lastName: "გვარი",
  email: "იმეილი",
  password: "ახალი პაროლი",
  confirmPassword: "გაიმეორეთ პაროლი",
  save: "ცვლილებების შენახვა",
};

const admin_en = {
  edit: "edit",
  delete: "delete",
  save: "save ",
};

const admin_ka = {
  edit: "რედაქტირება",
  delete: "წაშლა",
  save: "შენახვა",
};

const addNewPost_en = {
  title: "title",
  body: "body",
  tags: "tags",
  addPost: "add new post",
};

const addNewPost_ka = {
  title: "სათაური",
  body: "სხეული",
  tags: "ტეგები",
  addPost: "ახალი პოსტის დამატება",
};

const footer_en = {
  copy: "all rights reserved",
  terms: "terms and conditions",
  privacy: "privacy policy",
  nav: [
    { text: "home", href: "/" },
    { text: "about", href: "/about" },
    { text: "blog", href: "/blog" },
    { text: "contact", href: "/contact" },
    { text: "premium", href: "/premium" },
    { text: "profile", href: "/profile" },
  ],
  newsletter: "subscribe to our newsletter",
  subscribe: "subscribe",
};

const footer_ka = {
  copy: "ყველა უფლება დაცულია",
  terms: "წესები და პირობები",
  privacy: "კონფიდენციალუბა",
  nav: [
    { text: "მთავარი", href: "/" },
    { text: "ჩვენს შესახებ", href: "/about" },
    { text: "ბლოგი", href: "/blog" },
    { text: "კონტაქტი", href: "/contact" },
    { text: "პრემიუმი", href: "/premium" },
    { text: "პროფილი", href: "/profile" },
  ],
  newsletter: "ნიუზლეთერის გამოწერა",
  subscribe: "გამოწერა",
};

const about_en = {
  heading: "about us",
};
const about_ka = {
  heading: "ჩვენს შესახებ",
};

const addNewProduct_en = {
  name: "name",
  price: "price",
  description: "description",
  category: "category",
  brand: "brand",
  discountpercentage: "discount percentage",
  image: "image",
  images: "images",
  addProduct: "add new product",
};

const addNewProduct_ka = {
  name: "სახელი",
  price: "ფასი",
  description: "აღწერა",
  category: "კატეგორია",
  brand: "ბრენდი",
  discountpercentage: "ფასდაკლება",
  image: "სურათი",
  images: "სურათები",
  addProduct: "ახალი პროდუქტის დამატება",
};

export const libraries: Libraries = {
  en: {
    auth: auth_en,
    header: header_en,
    main: {
      products: products_en,
      about: about_en,
      contact: contact_en,
      premium: premium_en,
      profile: profile_en,
      admin: admin_en,
      addNewPost: addNewPost_en,
      addNewProduct: addNewProduct_en,
    },
    footer: footer_en,
  },
  ka: {
    auth: auth_ka,
    header: header_ka,
    main: {
      products: products_ka,
      about: about_ka,
      contact: contact_ka,
      premium: premium_ka,
      profile: profile_ka,
      admin: admin_ka,
      addNewPost: addNewPost_ka,
      addNewProduct: addNewProduct_ka,
    },
    footer: footer_ka,
  },
};
