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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CreateIcon from "@material-ui/icons/Create";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import SearchIcon from "@material-ui/icons/Search";
import alphabet from "../images/alphabet.svg";
import OrderForm from "../components/orderForm";
import SameplePdf from "../media/sample.pdf";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const description = {
  1: "To introduce the student to basic dictionary skills through practice in locating words in alphabetical order and ensuring correct spelling.",
  2: "To help each student to become self-reliant in finding words for creative writing and spelling them correctly.",
  3: "To provide each student with an opportunity to enlarge their writing words list by adding in the spaces provided words they have acquired from other sources.",
  4: "To provide practice in finding words classified by subject headings.",
};

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
          <Typography variant="h6">
            "My Writing Dictionary" is recommended for students in Division One
            with the following objectives in mind:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary={description[1]} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary={description[2]} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary={description[3]} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={description[4]} />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button
            target={matchesSM ? "_blank" : undefined}
            href={matchesSM ? SameplePdf : undefined}
            color="primary"
            onClick={matchesSM ? undefined : handleOpen}
            variant="contained"
            style={{ backgroundColor: "#00adb5" }}
            fullWidth
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
    marginTop: "20%",

    [theme.breakpoints.up("sm")]: {
      marginTop: "30vh",
      maxWidth: "50rem",
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
