import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import GoogleMapReact from "google-map-react";
import { LocationOnOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  mapContainer: {
    height: "85vh",
    width: "100%",
  },
  typography: {},
  paper: {
    width: "100px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    flexDirection: "column",
  },
  cardImage: {
    height: "85px",
    width: "85px",
    cursor: "pointer",
  },
}));

function Map({ places, coords, setBounds, setCoords, setChildClicked }) {
  //earlier I was using the default values of vietnam
  // const defaultProps = {
  //   center: {
  //     lat: 19.136326,
  //     lng: 72.82766,
  //   },
  //   zoom: 14,
  // };

  //now here I am going to use the actual locations
  const defaultProps = {
    center: {
      lat: coords.lat,
      lng: coords.lng,
    },
    zoom: 14,
  };
  const classes = useStyles();
  return (
    <Box className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        // defaultCenter={defaultProps.center}
        defaultCenter={coords}
        //I have added this property while using actual gps location, earlier I was not using center, if I don't add center then I won't see the map
        center={coords}
        defaultZoom={defaultProps.zoom}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(event) => {
          setCoords({ lat: event.center.lat, lng: event.center.lng });
          setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places.length > 0 &&
          places.map((place, index) => {
            return (
              <div lat={place.latitude} lng={place.longitude} key={index}>
                <LocationOnOutlined color="primary" fontSize="large" />
                <Paper className={classes.paper}>
                  <Typography className={classes.typography}>
                    {place.name}
                  </Typography>
                  <img
                    className={classes.cardImage}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodservicehospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt=""
                  />
                  <Rating readOnly size="small" value={Number(place.rating)} />
                </Paper>
              </div>
            );
          })}
      </GoogleMapReact>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
      /> */}
    </Box>
  );
}

export default Map;
