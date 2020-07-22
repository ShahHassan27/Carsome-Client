import React, { useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

import {
  makeStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Avatar,
  IconButton,
  Typography,
  Container,
  Menu,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { Alert, Skeleton } from "@material-ui/lab/";
import AppointmentForm from "./AppointmentForm";
import ContactForm from "./ContactForm";
import Logo from "../assets/Logo.png";
import ConfirmationCard from "./ConfirmationCard";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Car-sum
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: 190,
  },
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: 100,
  },
  card: {
    textAlign: "center",
  },
}));

const steps = ["Appointment booking", "Contact details"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AppointmentForm />;
    case 1:
      return <ContactForm />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  const handleSnack = (error) => {
    setOpen(true);
    setErrorMessage(error);
  };

  const handleCloseSnack = (event, reason) => {
    setOpen(false);
  };

  const context = useContext(AuthContext);

  const CREATE_RESERVATION_MUTATION = gql`
    mutation createReservation($time: String!, $createdAt: String!) {
      createReservation(
        reservationInput: { time: $time, createdAt: $createdAt }
      ) {
        firstName
        lastName
        createdAt
        time
      }
    }
  `;

  const [reservation, { loading }] = useMutation(CREATE_RESERVATION_MUTATION, {
    update(_, { data: { createReservation: bookingData } }) {},
    onError(err) {
      const error = err.graphQLErrors[0].extensions.exception.errors.body;
      setActiveStep(activeStep - 1);
      handleSnack(error);
    },
    variables: {
      time: context.time,
      createdAt: context.date,
    },
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logout } = useContext(AuthContext);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleConfirm = () => {
    reservation();
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.title}
              noWrap
            >
              <img src={Logo} alt="logo" className={classes.logo} />
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <Avatar
                alt="Matt Giampietro"
                src="https://semantic-ui.com/images/avatar2/large/matthew.png"
              />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Schedule your vehicle inspection below
          </Typography>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
          >
            <Alert onClose={handleCloseSnack} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                {loading ? (
                  <Container className={classes.root}>
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      className={classes.media}
                    />
                    <Skeleton animation="wave" height={10} width="35%" />
                    <Skeleton
                      animation="wave"
                      height={10}
                      style={{ marginBottom: 6 }}
                      width="80%"
                    />
                  </Container>
                ) : (
                  <React.Fragment>
                    <ConfirmationCard className={classes.card} />
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleConfirm
                        : handleNext
                    }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
