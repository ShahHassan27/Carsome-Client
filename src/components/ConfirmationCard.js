import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab/";
import Book from "../assets/book.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: 190,
  },
}));

export default function ConfirmationCard() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleCloseSnack = (event, reason) => {
    setOpen(false);
  };

  return (
    <Container className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={Book}
          title="Confirmation"
        />
        <CardContent>
          <Typography variant="subtitle2" component="h6">
            Booking confirm
          </Typography>
          <Typography variant="body2" component="p">
            An invitation has been emailed to you.
          </Typography>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Sign out clicking the avatar.
        </Alert>
      </Snackbar>
    </Container>
  );
}
