import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import GoogleMapReact from "google-map-react";
const useStyles = makeStyles((theme) => ({
  mapContainer: {
    height: "85vh",
    width: "100%",
  },
}));

function Map() {
  const defaultProps = {
    center: {
      lat: 19.136326,
      lng: 72.82766,
    },
    zoom: 14,
  };
  const classes = useStyles();
  return (
    <Box className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
      ></GoogleMapReact>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
      /> */}
    </Box>
  );
}

export default Map;
