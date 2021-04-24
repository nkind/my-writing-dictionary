import React from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";

import alphabet from "../images/alphabet.svg";
import Form from "../components/form";

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
      <Form />

      <div className={classes.backImage} />
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  backImage: {
    backgroundImage: `url(${alphabet})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    position: "fixed",
  },
}));
