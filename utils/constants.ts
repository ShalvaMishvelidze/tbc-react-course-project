export const navLinks = [
  "home",
  "about",
  "blog",
  "contact",
  "premium",
  "profile",
];

export const PRODUCTS_API_URL = "https://dummyjson.com/products";

export const POSTS_API_URL = "https://dummyjson.com/posts";

export interface User {
  id: number;
  username: string;
  email: string;
  age: number | null;
  role: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
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

export interface Products {
  search: string;
  heading: string;
  sort: {
    heading: string;
    options: string[];
  };
  addToCart: string;
}

interface Main {
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
}

export interface Footer {
  nav: { [key: string]: string }[];
  copy: string;
  terms: string;
  privacy: string;
  newsletter: string;
  subscribe: string;
}

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

export const libraries: Libraries = {
  en: {
    auth: {
      username: "username",
      email: "email",
      password: "password",
      login: "log in",
      register: "register",
      user: "user",
      admin: "admin",
      loginMsg: "don't have an account yet?",
      registerMsg: "already have an account?",
    },
    header: {
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
    },
    main: {
      products: {
        search: "Enter what you're looking for",
        heading: "Products",
        sort: {
          heading: "Sort",
          options: ["A-Z", "Z-A", "Price ascending", "Price descending"],
        },
        addToCart: "Add to cart",
      },
      about: {
        heading: "About us",
      },
      contact: {
        heading: "Contact us",
        formHeading: "Contact form",
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Submit",
      },
      premium: {
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
      },
      profile: {
        heading: "Profile",
        name: "Name",
        lastName: "Last name",
        email: "Email",
        password: "New Password",
        confirmPassword: "Confirm Password",
        save: "save",
      },
      admin: {
        edit: "edit",
        delete: "delete",
        save: "save",
      },
      addNewPost: {
        title: "title",
        body: "body",
        tags: "tags",
        addPost: "add new post",
      },
    },
    footer: {
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
    },
  },
  ka: {
    auth: {
      username: "სახელი",
      email: "იმეილი",
      password: "პაროლი",
      login: "შესვლა",
      register: "რეგისტრაცია",
      user: "მომხმარებელი",
      admin: "ადმინისტრატორი",
      loginMsg: "ჯერ არ გაქვთ ანგარიში?",
      registerMsg: "უკვე გაქვთ ანგარიში?",
    },
    header: {
      nav: [
        { text: "მთავარი", href: "/" },
        { text: "ჩვენს შესახებ", href: "/about" },
        { text: "ბლოგი", href: "/blog" },
        { text: "კონტაქტი", href: "/contact" },
        { text: "პრემიუმი", href: "/premium" },
        { text: "პროფილი", href: "/profile" },
        { text: "ადმინისტრატორი", href: "/admin" },
      ],
      lang: ["ინგ", "ქარ"],
    },
    main: {
      products: {
        search: "გთხოვთ შეიყვანოთ რას ეძებთ",
        heading: "პროდუქტები",
        sort: {
          heading: "დალაგება",
          options: ["ა-ჰ", "ჰ-ა", "ფასის ზრდით", "ფასის კლებით"],
        },
        addToCart: "კალათში დამატება",
      },
      about: {
        heading: "ჩვენს შესახებ",
      },
      contact: {
        heading: "დაგვიკავშირდით",
        formHeading: "საკონტაქტო ფორმა",
        name: "სახელი",
        email: "იმეილი",
        message: "შეტყობინება",
        submit: "გაგზავნა",
      },
      premium: {
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
      },
      profile: {
        heading: "პროფილი",
        name: "სახელი",
        lastName: "გვარი",
        email: "იმეილი",
        password: "ახალი პაროლი",
        confirmPassword: "გაიმეორეთ პაროლი",
        save: "შენახვა",
      },
      admin: {
        edit: "რედაქტირება",
        delete: "წაშლა",
        save: "შენახვა",
      },
      addNewPost: {
        title: "სათაური",
        body: "სხეული",
        tags: "ტეგები",
        addPost: "ახალი პოსტის დამატება",
      },
    },
    footer: {
      copy: "ყველა უფლება დაცულია",
      terms: "წესები და პირობები",
      privacy: "კონფიდენციალურობა",
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
    },
  },
};
