import { NextPage, GetStaticProps, GetStaticPaths } from "next";
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
import http from "../../http";
import { Product } from "../../models";

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailsPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  return (
    <div>
      <Head>
        <title>{product.slug} - Product Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card>
        <CardHeader
          title={product.name.toUpperCase()}
          subheader={`R$ ${product.price}`}
        />
        <CardActions>
          <Button size="small" color="primary" component="a">
            Buy
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

export default ProductDetailsPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const response = await http.get(`products/${slug}`);
  return {
    props: { product: response.data },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data: products } = await http.get("products");

  const paths = products.map((p: Product) => ({
    params: { slug: p.slug },
  }));

  return { paths, fallback: "blocking" };
};
