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
import { useForm } from "react-hook-form";
import http from "../../../http";
import { CreditCard, Product } from "../../../models";

interface OrderPageProps {
  product: Product;
}

const CheckoutPage: NextPage<OrderPageProps> = ({ product }) => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data: CreditCard) => {
    console.log("TESTE");
    const { data: order } = await http.post("orders", {
      credit_card: data,
      items: [{ product_id: product.id, quantity: 1 }],
    });
    // console.log("resulto: " + JSON.stringify(order));
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField {...register("name")} label="Name" fullWidth required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("number")}
              label="Card Number"
              fullWidth
              inputProps={{ maxLength: 16 }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("cvv")}
              type="number"
              label="CVV"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register("expiration_month")}
                  type="number"
                  label="Expiration Month"
                  fullWidth
                  required
                  onChange={(e) => {
                    setValue("expiration_month", parseInt(e.target.value));
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register("expiration_year")}
                  type="number"
                  label="Expiration Year"
                  fullWidth
                  required
                  onChange={(e) => {
                    setValue("expiration_year", parseInt(e.target.value));
                  }}
                />
              </Grid>
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
