import { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import {
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import http from "../../../http";
import { Product } from "../../../models";

interface OrderPageProps {
  product: Product;
}

const CheckoutPage: NextPage<OrderPageProps> = ({ product }) => {
  return (
    <div>
      <Head>
        <title>{product.slug} - Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Checkout
      </Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={product.image_url} />
        </ListItemAvatar>
        <ListItemText primary={product.name} secondary={`$ ${product.price}`} />
      </ListItem>
      <Typography component="h2" variant="h6" color="textPrimary">
        Pay with your credit card
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label="Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Card Number" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="CVV" fullWidth />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField label="Expiration Month" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Expiration Year" fullWidth />
            </Grid>
          </Grid>
        </Grid>
        <Box marginTop={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pay
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CheckoutPage;

export const getServerSideProps: GetServerSideProps<
  OrderPageProps,
  { slug: string }
> = async (context) => {
  const { slug } = context.params;
  try {
    const { data: product } = await http.get(`products/${slug}`);
    return {
      props: { product },
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true };
    }

    throw e;
  }
};
