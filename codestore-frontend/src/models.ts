export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  price: number;
  created_at: string;
}

export const products: Product[] = [
  {
    id: "uuid",
    name: "produto fake",
    description: "description do produto fake",
    price: 50.5,
    image_url:
      "https://source.unsplash.com/random?product" + Math.round(Math.random()),
    slug: "produto-fake",
    created_at: "2021-06-06T00:00:00",
  },
  {
    id: "uuid",
    name: "produto fake",
    description: "description do produto fake",
    price: 50.5,
    image_url: "https://source.unsplash.com/random?product" + Math.random(),
    slug: "produto-fake",
    created_at: "2021-06-06T00:00:00",
  },
];
