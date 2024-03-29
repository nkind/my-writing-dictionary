import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import formatString from "format-string-by-pattern";
import axios from "axios";
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
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Form fields that don't need a formatting mask
const standardFields = [
  { name: "firstName", label: "First name", type: "text" },
  { name: "lastName", label: "Last name", type: "text" },
  { name: "email", label: "Email", type: "email" },
];

// Fields that display in common format
const phoneMask = {
  name: "phonenumber",
  label: "Phone Number",
  parse: "(999) 999-9999",
  type: "tel",
};

const postalCodeMask = {
  name: "postalcode",
  label: "Postal Code",
  parse: "XXX XXX",
  type: "text",
};

// Select options for languages
const languageOptions = [
  { label: "English", value: "ENG" },
  { label: "French", value: "FR" },
];

export default function OrderForm() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState("ENG");
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });

  const handleFormToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelectChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      form.reset();
    } else {
      console.warn(msg);
    }
  };

  const handleSubmit = (event) => {
    const form = event.target;
    setServerState({ submitting: true });
    axios({
      method: "post",
      url: "https://getform.io/f/d1bbbd0d-1f16-443b-b456-86a433f2c922",
      data: new FormData(form),
    })
      .then(() => {
        handleServerResponse(true, "Message Sent!", form);
      })
      .catch((e) => {
        handleServerResponse(false, e, form);
      });

    return false;
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

  // Contact form
  const formDrawer = () => {
    return (
      <div>
        <div className={classes.toolbar}>
          <Hidden mdUp implementation="js">
            <IconButton onClick={handleFormToggle} style={{ margin: "auto" }}>
              <ChevronRightIcon height={32} width={32} />
            </IconButton>
          </Hidden>
        </div>
        <Divider />
        <Typography variant="h6" align="center">
          Contact us to learn more or submit an order
        </Typography>
        <Form
          onSubmit={handleSubmit}
          render={({ form, submitting, pristine }) => (
            <form
              autoComplete="off"
              method="post"
              action="https://getform.io/f/d1bbbd0d-1f16-443b-b456-86a433f2c922"
              className={classes.message}
              onSubmit={handleSubmit}
            >
              <div style={{ margin: matchesSM ? 8 : undefined }}>
                {standardFields.map((field) => (
                  <div key={field.name}>
                    <Field
                      name={field.name}
                      validate={required}
                      type={field.type}
                    >
                      {({ input, meta }) => (
                        <div>
                          <TextField
                            {...input}
                            label={field.label}
                            placeholder={field.label}
                            required
                            error={meta.touched && meta.error}
                            className={classes.fieldMargin}
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                ))}
                <Field
                  name={phoneMask.name}
                  validate={required}
                  type={phoneMask.type}
                  parse={formatString(phoneMask.parse)}
                >
                  {({ input, meta }) => (
                    <div>
                      <TextField
                        {...input}
                        label={phoneMask.label}
                        placeholder={phoneMask.parse}
                        required
                        error={meta.touched && meta.error}
                        className={classes.fieldMargin}
                      />
                    </div>
                  )}
                </Field>
                <div className={classes.formRow}>
                  <Field name="address" validate={required} type="text">
                    {({ input, meta }) => (
                      <div>
                        <TextField
                          {...input}
                          label="Address"
                          placeholder="Address"
                          required
                          error={meta.touched && meta.error}
                          style={{
                            width: matchesSM ? "45vw" : "12rem",
                          }}
                          className={classes.fieldMargin}
                        />
                      </div>
                    )}
                  </Field>
                  <Field
                    name={postalCodeMask.name}
                    validate={required}
                    type={postalCodeMask.type}
                    parse={formatString(postalCodeMask.parse)}
                  >
                    {({ input, meta }) => (
                      <div>
                        <TextField
                          {...input}
                          label={postalCodeMask.label}
                          placeholder={postalCodeMask.parse}
                          required
                          error={meta.touched && meta.error}
                          style={{
                            width: matchesSM ? "45vw" : "80%",
                            float: matchesSM ? "right" : undefined,
                          }}
                          className={classes.fieldMargin}
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className={classes.formRow}>
                  <Field name="language">
                    {({ input }) => (
                      <div>
                        <TextField
                          {...input}
                          select
                          label="Language Options"
                          defaultValue={"ENG"}
                          value={language}
                          onChange={handleSelectChange}
                          required
                          SelectProps={{
                            native: true,
                          }}
                          style={{
                            width: matchesSM ? "45vw" : "12rem",
                          }}
                          className={classes.fieldMargin}
                        >
                          {languageOptions.map(({ label, value }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </TextField>
                      </div>
                    )}
                  </Field>
                  <Field
                    name="amount"
                    validate={composeValidators(minValue(1), maxValue(999))}
                    type="number"
                  >
                    {({ input, meta }) => (
                      <div>
                        <TextField
                          {...input}
                          label="Order Amount"
                          placeholder="Amount"
                          fullWidth
                          onInput={(event) => {
                            event.target.value = Math.max(
                              0,
                              parseInt(event.target.value),
                            )
                              .toString()
                              .slice(0, 3);
                          }}
                          error={meta.touched && meta.error}
                          style={{
                            width: matchesSM ? "45vw" : "80%",
                            float: matchesSM ? "right" : undefined,
                          }}
                          className={classes.fieldMargin}
                        />
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <div className={classes.message} style={{ marginTop: 15 }}>
                <Field name="message" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <TextField
                        {...input}
                        label="Message"
                        multiline
                        rows={8}
                        variant="filled"
                        required
                        error={meta.touched && meta.error}
                      />
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
                <Button
                  type="submit"
                  disable={submitting || serverState.submitting}
                  variant="contained"
                  size={matchesXS ? "small" : "large"}
                  style={{ backgroundColor: "#00adb5", color: "#fff" }}
                  className={classes.formButton}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  variant="contained"
                  size={matchesXS ? "small" : "large"}
                  style={{ backgroundColor: "#eee" }}
                  className={classes.formButton}
                >
                  Reset
                </Button>
              </div>
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
        <Hidden lgUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "left" : "right"}
            open={mobileOpen}
            onClose={handleFormToggle}
            classes={{
              paper: classes.formPaper,
            }}
            ModalProps={{
              keepMounted: true, // @mui: better open performance on mobile
            }}
          >
            {formDrawer()}
          </Drawer>
        </Hidden>
        {/* Persistent drawer on larger screens */}
        <Hidden mdDown implementation="js">
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
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: formWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "#00adb5",
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${formWidth}px)`,
      marginRight: formWidth,
    },
  },
  menuButton: {
    marginLeft: "auto",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  formPaper: {
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: formWidth,
    },
  },
  formRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  message: {
    "& .MuiTextField-root": {
      width: "100%",
      [theme.breakpoints.up("lg")]: {
        margin: theme.spacing(1),
        width: "52ch",
      },
    },
  },
  fieldMargin: {
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 12,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: 8,
    },
  },
  formButton: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: 12,
    },
  },
}));
