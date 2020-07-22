import React, { Fragment, useContext, useState } from "react";
import moment from "moment";
import { DatePicker } from "@material-ui/pickers";

import { AuthContext } from "../context/auth";

function InlineDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  const context = useContext(AuthContext);

  const handleChange = (selectedDate) => {
    handleDateChange(selectedDate);
    context.addDate(moment(selectedDate).format("dddd[,] MMMM DD[,] YYYY"));
  };

  return (
    <Fragment>
      <DatePicker
        disableToolbar
        variant="static"
        label="Only calendar"
        value={selectedDate}
        onChange={handleChange}
        disablePast
        maxDate={moment().add(20, "d")}
        shouldDisableDate={(date) => {
          return moment(date).format("dddd") === "Sunday";
        }}
      />
    </Fragment>
  );
}

export default InlineDatePicker;
