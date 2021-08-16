export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  price: number;
  created_at: string;
}

export interface CreditCard {
  number: string;
  name: string;
  expiration_year: number;
  expiration_month: number;
  cvv: string;
}

export const products: Product[] = [
  {
    id: "uuid",
    name: "Awesome product",
    description: "This is an awesome product",
    price: 50.5,
    image_url:
      "https://source.unsplash.com/random?product-" + Math.round(Math.random()),
    slug: "awesome-products",
    created_at: "2021-06-06T00:00:00",
  },
  {
    id: "uuid",
    name: "Code product",
    description: "This is a code product",
    price: 50.5,
    image_url: "https://source.unsplash.com/random?product-" + Math.random(),
    slug: "code-products",
    created_at: "2021-06-06T00:00:00",
  },
];
