import React from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import alphabet from "../images/alphabet.svg";
import OrderForm from "../components/orderForm";

export default function Index() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Writing Dictionary</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <div className={classes.backImage} />

      <Card
        className={classes.cardRoot}
        style={{ backgroundColor: "white", opacity: 1 }}
      >
        <CardActionArea>
          <CardContent>
            <Typography>What is My Writing Dictionary?</Typography>
            <Typography>It's a book to make lil guys write good.</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Sample
          </Button>
        </CardActions>
      </Card>
      <OrderForm />
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
  },
  cardRoot: {
    marginTop: "20%",
    zIndex: 1,
  },
  backImage: {
    backgroundImage: `url(${alphabet})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    zIndex: 0,
  },
}));
