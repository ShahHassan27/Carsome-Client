import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { AuthContext } from "../context/auth";

export default function ContactForm() {
  const { user } = useContext(AuthContext);
  return (
    <React.Fragment>
      <Typography variant="subtitle2" gutterBottom>
        Contact information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            value={user.firstName}
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={user.lastName}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={user.email}
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email address"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
