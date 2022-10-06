import {
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Grid,
} from "@material-ui/core";
import { useState, useEffect, createRef } from "react";
import React from "react";
import PlaceDetail from "./PlaceDetail";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "25px",
  },
  formControl: {
    margin: "10px",
    minWidth: "120px",
    marginBottom: "30",
  },
  //this css will only be seen when our data is loading
  loading: {
    width: "100%",
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid red",
  },
  list: {
    height: "75vh",
    //overflow auto will show overflow if we more element otherwise it will not show overflow
    overflow: "auto",
  },
}));
function List({ type, setType, isLoading, childClicked, places }) {
  //we want to point out the place we have selected in the list, so we want to get the reference of that location, so that we can highlight that location
  const [elRefs, setElRefs] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    //here we used fill method to avoid undefined error, because when we made the array there is no elements inside it so we use fill method to initaize it.

    //inside map we just locate the index, we don't have use of values
    setElRefs((refs) => {
      return Array(places.length)
        .fill()
        .map((_, index) => refs[index] || createRef());
    });
  }, [places]);
  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div>
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
          <Grid container spacing={3} className={classes.list}>
            {places &&
              places.map((place, index) => {
                return (
                  <Grid ref={elRefs[index]} item xs={12}>
                    {/* add placedetail over here */}
                    <PlaceDetail
                      selected={Number(childClicked) === index}
                      //above i have used the ref ans here I am passing props and it is contradicting so I will change the name form ref to placeRef
                      placeRef={elRefs[index]}
                      place={place}
                      key={index}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default List;
