import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import InlineDatePicker from "./InlineDatePicker";
import TimeListPicker from "./TimeListPicker";

export default function AppointmentForm() {
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={10}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">
            Pick a convenient date for inspection
          </Typography>
          <InlineDatePicker />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" gutterBottom>
            What time works best?
          </Typography>
          <TimeListPicker />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
