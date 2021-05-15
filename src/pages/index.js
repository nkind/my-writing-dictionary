import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import alphabet from "../images/alphabet.svg";
import OrderForm from "../components/orderForm";
import SameplePdf from "../media/sample.pdf";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Index() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

      <Card className={classes.cardRoot}>
        <CardContent>
          <Typography>What is My Writing Dictionary?</Typography>
          <Typography>It's a book to make lil guys write good.</Typography>
        </CardContent>
        <CardActions>
          <Button
            target={matchesSM ? "_blank" : undefined}
            href={matchesSM ? SameplePdf : undefined}
            size="small"
            color="primary"
            onClick={matchesSM ? undefined : handleOpen}
          >
            Sample
          </Button>
        </CardActions>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.dialogBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.dialogTitle}>
              My Writing Dictionary Sample
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ overflow: "hidden" }}>
          <iframe
            title="pdfsample"
            src={SameplePdf}
            style={{ width: "100%", height: "100vh" }}
          />
        </div>
      </Dialog>
      <OrderForm />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
  },
  cardRoot: {
    zIndex: 1,
    backgroundColor: "#FFF",
    opacity: 1,
    marginTop: "60%",
    [theme.breakpoints.up("sm")]: {
      marginTop: "20%",
    },
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
  dialogBar: {
    backgroundColor: "#00adb5",
    position: "relative",
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
