import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import http from "../http";
import { Product } from "../models";

interface ProductsListPageProps {
  products: Product[];
}

const ProductsListPage: NextPage<ProductsListPageProps> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Listagem de produtos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Produtos
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, key) => (
          <Grid key={key} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                style={{ paddingTop: "56%" }}
                image={product.image_url}
              />
              <CardContent>
                <Typography component="h2" variant="h5" gutterBottom>
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  href="/products/[slug]"
                  as={`/products/${product.slug}`}
                  passHref
                >
                  <Button component="a" size="small" color="primary">
                    Detalhes
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await http.get("products");
  return {
    props: { products: response.data },
  };
};
