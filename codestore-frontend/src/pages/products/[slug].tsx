import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
} from "next";
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
  products: Product[];
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>{products[0].slug} - Detalhes do produto</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {products.map((product) => (
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
      ))}
    </div>
  );
};

export default ProductDetailPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const response = await http.get(`products/${slug}`);
  return {
    props: { products: response.data },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data: products } = await http.get("products");

  const paths = products.map((p: Product) => ({
    params: { slug: p.slug },
  }));

  return { paths, fallback: "blocking" };
};
