import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "25px",
  },
  formControl: {
    margin: "10px",
    minWidth: "120px",
    marginBottom: "30",
  },
}));
function List({ type, setType, isLoading, childClick, places }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="type">Type:</InputLabel>
        <Select
          id="placeType"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default List;
