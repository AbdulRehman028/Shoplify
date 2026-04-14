export const products = [
  {
    name: "iPhone 15 Pro",
    price: 999,
    description: "Apple iPhone 15 Pro with A17 Pro chip and titanium design.",
    ratings: 4.8,
    Images: [
      {
        public_id: "iphone15pro_1",
        url: "https://example.com/images/iphone15pro1.jpg",
      },
      {
        public_id: "iphone15pro_2",
        url: "https://example.com/images/iphone15pro2.jpg",
      }
    ],
    category: "Electronics",
    seller: "Apple Store",
    stock: 50,
    numOfReviews: 17,
    user: null,       // optional for testing
    reviews: [],      // optional for testing
  },

  {
    name: "Sony WH-1000XM5",
    price: 399,
    description: "Industry-leading noise cancelling headphones.",
    ratings: 4.6,
    Images: [
      {
        public_id: "sony_xm5_1",
        url: "https://example.com/images/sony_xm5.jpg",
      }
    ],
    category: "Headphones",
    seller: "Sony Official",
    stock: 120,
    numOfReviews: 12,
    user: null,
    reviews: [],
  },

  {
    name: "MacBook Air M2",
    price: 1199,
    description: "Apple MacBook Air powered by M2 chip, light and fast.",
    ratings: 4.7,
    Images: [
      {
        public_id: "macbook_air_m2",
        url: "https://example.com/images/macbookairm2.jpg",
      }
    ],
    category: "Laptops",
    seller: "Apple Store",
    stock: 30,
    numOfReviews: 25,
    user: null,
    reviews: [],
  },

  {
    name: "Nike Air Max",
    price: 149,
    description: "Comfortable and stylish running shoes.",
    ratings: 4.4,
    Images: [
      {
        public_id: "nike_airmax",
        url: "https://example.com/images/nikeairmax.jpg",
      }
    ],
    category: "Clothes/Shoes",
    seller: "Nike",
    stock: 80,
    numOfReviews: 8,
    user: null,
    reviews: [],
  },

  {
    name: "Canon EOS R6",
    price: 2499,
    description: "Professional mirrorless camera with high-speed performance.",
    ratings: 4.9,
    Images: [
      {
        public_id: "canon_eos_r6",
        url: "https://example.com/images/canoneosr6.jpg",
      }
    ],
    category: "Cameras",
    seller: "Canon Store",
    stock: 15,
    numOfReviews: 5,
    user: null,
    reviews: [],
  }
];
