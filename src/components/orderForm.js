import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function OrderForm() {
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleFormToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onSubmit = async (values) => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  // Form validation
  const required = (value) => (value ? undefined : "Required");

  // Acceptable range for order amount
  const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Cannot order less than ${min}`;
  const maxValue = (max) => (value) =>
    isNaN(value) || value <= max
      ? undefined
      : `Cannot order more than ${max} at a time`;

  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );

  // Contact form for sending out emails
  const formDrawer = () => {
    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <Typography variant="h6" align="center">
          Contact us to learn more or order now
        </Typography>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.formRow}>
                <Field name="firstName" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <TextField
                        {...input}
                        label="First name"
                        placeholder="First name"
                        required
                        error={meta.error && meta.touched}
                      />
                    </div>
                  )}
                </Field>
                <Field name="lastName" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <TextField
                        {...input}
                        label="Last name"
                        placeholder="Last name"
                        required
                        error={meta.error && meta.touched}
                      />
                    </div>
                  )}
                </Field>
              </div>
              <div className={classes.formRow} style={{ marginTop: 15 }}>
                <Field name="email" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <TextField
                        {...input}
                        label="Email"
                        placeholder="email@real.com"
                        required
                        error={meta.error && meta.touched}
                      />
                    </div>
                  )}
                </Field>
                <Field
                  name="amount"
                  validate={composeValidators(minValue(1), maxValue(99))}
                >
                  {({ input, meta }) => (
                    <div>
                      <TextField
                        {...input}
                        type="number"
                        label="Order amount"
                        error={meta.error && meta.touched}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <div>
                        {meta.touched && meta.error && (
                          <span style={{ color: "red" }}>{meta.error}</span>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: 30,
                }}
              >
                <Button type="submit" disable={submitting} variant="contained">
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  variant="outlined"
                >
                  Reset
                </Button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            My Writing Dictionary
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open form"
            edge="end"
            onClick={handleFormToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.form} aria-label="form details">
        {/* Only toggle drawer on small screen sizes */}
        <Hidden smUp implementation="js">
          <Drawer
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
        {/* Persistent drawer on larger screens */}
        <Hidden xsDown implementation="js">
          <Drawer
            classes={{
              paper: classes.formPaper,
            }}
            variant="permanent"
            anchor="right"
            open
          >
            {formDrawer()}
          </Drawer>
        </Hidden>
      </div>
    </div>
  );
}

const formWidth = 450;

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
    backgroundColor: "#00adb5",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${formWidth}px)`,
      marginRight: formWidth,
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  formPaper: {
    width: formWidth,
  },
  formRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));
