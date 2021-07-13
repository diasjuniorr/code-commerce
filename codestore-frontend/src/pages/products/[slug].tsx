import { NextPage } from "next";
import Head from "next/head";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardHeader,
} from "@material-ui/core";
import { Product } from "../../models";
import React from "react";
import { products } from "../../models";

interface ProductDetailPageProps {
  product: Product;
}

const product = products[0];
// const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
const ProductDetailPage = () => {
  return (
    <div>
      <Head>
        <title>{product.name} - Detalhes do produto</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card>
        <CardHeader
          title={product.name.toUpperCase()}
          subheader={`R$ ${product.price}`}
        />
        <CardActions>
          <Button size="small" color="primary" component="a">
            Comprar
          </Button>
        </CardActions>
        <CardMedia style={{ paddingTop: "56%" }} image={product.image_url} />
        <CardContent>
          <Typography
            component="p"
            variant="body2"
            color="textSecondary"
            gutterBottom
          >
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
