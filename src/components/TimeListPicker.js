import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Scrollbars } from "react-custom-scrollbars";

import { AuthContext } from "../context/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 280,
  },
  alphabet: {
    textAlign: "center",
  },
}));

export default function TimeListPicker() {
  const classes = useStyles();

  const context = useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = useState(2);

  const handleListItemClick = (event, index, value) => {
    setSelectedIndex(index);
    context.addTime(value);
  };

  return (
    <List className={classes.root}>
      <Scrollbars style={{ height: 250 }}>
        {[
          "9:00 am",
          "9:30 am",
          "10:00 am",
          "10:30 am",
          "11:00 am",
          "11:30 am",
          "12:00 pm",
          "12:30 pm",
          "1:00 pm",
          "1:30 pm",
          "2:00 pm",
          "2:30 pm",
          "3:00 pm",
          "3:30 pm",
          "4:00 pm",
          "4:30 pm",
          "5:00 pm",
          "5:30 pm",
          "6:00 pm",
        ].map((value, index) => {
          return (
            <ListItem
              key={index}
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index, value)}
            >
              <ListItemText
                id={index}
                primary={`${value}`}
                className={classes.alphabet}
              />
            </ListItem>
          );
        })}
      </Scrollbars>
    </List>
  );
}
