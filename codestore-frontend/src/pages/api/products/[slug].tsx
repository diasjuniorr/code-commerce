import type { NextApiRequest, NextApiResponse } from "next";
import { Product, products } from "../../../models";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const { slug } = req.query;
  const productsBySlug = products.filter((p) => p.slug === slug);
  console.log("debug: ", productsBySlug);
  res.status(200).json(productsBySlug);
}
