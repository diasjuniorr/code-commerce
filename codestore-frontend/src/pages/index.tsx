import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { products } from "../models";

export default function Home() {
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
                <Button component="a" size="small" color="primary">
                  Detalhes
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
