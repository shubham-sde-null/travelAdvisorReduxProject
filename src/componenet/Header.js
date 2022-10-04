import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "24px",
  },
}));
function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title}> Travel Advisor </Typography>{" "}
      </Toolbar>{" "}
    </AppBar>
  );
}

export default Header;
