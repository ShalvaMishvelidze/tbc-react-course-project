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
  nav: {
    home: "home",
    store: "store",
    blog: "blog",
    tours: "tours",
    contact: "contact",
  },
  lang: ["en", "ka"],
};
const header_ka = {
  nav: {
    home: "მთავარი",
    store: "მაღაზია",
    blog: "ბლოგი",
    tours: "ტურები",
    contact: "კონტაქტი",
  },
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
  seeMore: "see more",
  categories: "categories",
  addNewReview: "add new review",
  submit: "submit",
  edit: "edit",
  delete: "delete",
  save: "save",
  cancel: "cancel",
  uploadImage: "upload image",
};
const products_ka = {
  search: "გთხოვთ შეიყვანოთ რას ეძებთ",
  heading: "პროდუქტები",
  sort: {
    heading: "დალაგება",
    options: ["ა-ჰ", "ჰ-ა", "ფასის ზრდით", "ფასის კლებით"],
  },
  addToCart: "კალათში დამატება",
  seeMore: "მეტის ნახვა",
  categories: "კატეგორიები",
  addNewReview: "ახალი რევიუს დამატება",
  submit: "დადასტურება",
  edit: "რედაქტირება",
  delete: "წაშლა",
  save: "შენახვა",
  cancel: "გაუქმება",
  uploadImage: "სურათის ატვირთვა",
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
    title: "Explore our premium plans",
    heading: "Explorer Monthly",
    benefits: [
      "Up to 20% off on select tours and activities",
      "Early access to new tours and popular destinations",
      "One-on-one support for planning and booking",
      "Tailored travel plans based on preferences",
      "Complimentary basic travel insurance for each trip",
    ],
    book: "book now",
    only: "only",
  },
  yearly: {
    title: "Explore our premium plans",
    heading: "Adventurer Annual",
    benefits: [
      "Up to 30% off on select tours and activities",
      "Early access to new tours and destinations throughout the year",
      "Dedicated travel consultant with 24/7 support",
      "Custom itineraries with added luxury experiences and exclusive access",
      "Extended coverage including trip cancellations, medical emergencies, and lost luggage",
    ],
    book: "book now",
    only: "only",
  },
};
const premium_ka = {
  monthly: {
    title: "შეარჩიე შენზე მორგებული პრემიუმ გეგმა",
    heading: "მკვლევარი ყოველთვიურად",
    benefits: [
      "არჩეული ტურებისა და აქტივობების მიხედვით 20%-ით ფასდაკლება",
      "ახალი ტურების და პოპულარული დესტინაციების წინასწარი წვდომა",
      "ერთი ერთზე დახმარება დაგეგმვის და დაჯავშნისთვის",
      "მორგებული მგზავრობის გეგმები პრეფერენციების მიხედვით",
      "ყველა მოგზაურობისთვის უფასო სტანდარტული მგზავრობის დაზღვევა",
    ],
    book: "დაჯავშნა",
    only: "მხოლოდ",
  },
  yearly: {
    title: "შეარჩიე შენზე მორგებული პრემიუმ გეგმა",
    heading: "მოგზაური წლიურად",
    benefits: [
      "არჩეული ტურებისა და აქტივობების მიხედვით 30%-ით ფასდაკლება",
      "წვდომა ახალი ტურებისა და დესტინაციების წინასწარი წვდომა მთელი წლის განმავლობაში",
      "პირადი კონსულტანტი 24/7 დახმარებით",
      "უნიკალური შეთავაზებები და ექსკლუზიური წვდომა",
      "მგზავრობის გაუქმების, სამედიცინო გადაუდებელი დახმარების და დაკარგული ბარგის დაზღვევა",
    ],
    book: "დაჯავშნა",
    only: "მხოლოდ",
  },
};

const profile_en = {
  heading: "profile",
  name: "Name",
  lastName: "Last name",
  email: "Email",
  changeImage: "change image",
  save: "save changes",
};

const profile_ka = {
  heading: "პროფილი",
  name: "სახელი",
  lastName: "გვარი",
  email: "იმეილი",
  changeImage: "სურათის შეცვლა",
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
  nav: {
    home: "home",
    store: "store",
    blog: "blog",
    tours: "tours",
    contact: "contact",
  },
  newsletter: "subscribe to our newsletter",
  subscribe: "subscribe",
};

const footer_ka = {
  copy: "ყველა უფლება დაცულია",
  terms: "წესები და პირობები",
  privacy: "კონფიდენციალუბა",
  nav: {
    home: "მთავარი",
    store: "მაღაზია",
    blog: "ბლოგი",
    tours: "ტურები",
    contact: "კონტაქტი",
  },
  newsletter: "ნიუზლეთერის გამოწერა",
  subscribe: "გამოწერა",
};

const blog_en = {
  placeholder: "type here...",
  readMore: "read more",
  views: "views",
  tags: "tags",
  addNewComment: "add new comment",
  commentPlaceholder: "write your comment here...",
  submit: "submit",
  cancel: "cancel",
  edit: "edit",
  delete: "delete",
  save: "save",
};
const blog_ka = {
  placeholder: "დაწერეთ აქ...",
  readMore: "მეტის ნახვა",
  views: "ნახვები",
  tags: "ტეგები",
  addNewComment: "ახალი კომენტარის დამატება",
  commentPlaceholder: "დაწერეთ თქვენი კომენტარი აქ...",
  submit: "დადასტურება",
  cancel: "გაუქმება",
  edit: "რედაქტირება",
  delete: "წაშლა",
  save: "შენახვა",
};

const addNewProduct_en = {
  name: "name",
  price: "price",
  description: "description",
  category: "category",
  brand: "brand",
  discountpercentage: "discount percentage",
  image: "add main image",
  images: "add other images",
  addProduct: "add new product",
};

const addNewProduct_ka = {
  name: "სახელი",
  price: "ფასი",
  description: "აღწერა",
  category: "კატეგორია",
  brand: "ბრენდი",
  discountpercentage: "ფასდაკლება",
  image: "მთავარი სურათის დამატება",
  images: "სხვა სურათების დამატება",
  addProduct: "ახალი პროდუქტის დამატება",
};

export const libraries: Libraries = {
  en: {
    auth: auth_en,
    header: header_en,
    main: {
      products: products_en,
      blog: blog_en,
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
      blog: blog_ka,
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
