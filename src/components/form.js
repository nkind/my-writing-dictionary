import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function Form(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleFormToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const formDrawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Hello World!" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  console.info(container);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open form"
            edge="end"
            onClick={handleFormToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Order Now
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.form} aria-label="form details">
        {/* Only toggle drawer on small screen sizes */}
        <Hidden smUp implementation="js">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "ltr" ? "left" : "right"}
            open={mobileOpen}
            onClose={handleFormToggle}
            classes={{
              paper: classes.formPaper,
            }}
            ModalProps={{
              keepMounted: true, // @mui: better open performance on mobile
            }}
          >
            {formDrawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="js">
          <Drawer
            classes={{
              paper: classes.formPaper,
            }}
            variant="permanent"
            anchor="right"
            open
          >
            {formDrawer}
          </Drawer>
        </Hidden>
      </div>
    </div>
  );
}

const formWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  form: {
    [theme.breakpoints.up("sm")]: {
      width: formWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${formWidth}px)`,
      marginRight: formWidth,
    },
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  formPaper: {
    width: formWidth,
  },
}));
