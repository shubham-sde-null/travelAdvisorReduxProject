import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./componenet/Header";
import List from "./componenet/List";
import Map from "./componenet/Map.js";
import { useState } from "react";
import { useEffect } from "react";
import { getPlacesData } from "./api/travelAdvisorAPI";
function App() {
  const [type, setType] = useState("restaurants");
  const [isLoading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  //I will pass the setBounds as a prop to the map, so when map gets loaded then I will get the north east ans south west location, because in map component I am using the googlemap
  const [bounds, setBounds] = useState(null);
  useEffect(() => {
    if (bounds) {
      setLoading(true);
      getPlacesData(type, bounds.ne, bounds.sw).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setLoading(false);
      });
    }
  }, [type, setPlaces, bounds]);
  //here this hook is used to get the live loaction from gps
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({
          lat: latitude,
          lng: longitude,
        });
      }
    );
  }, []);
  return (
    <div>
      {/* Cssbaseline is used to remove the margin and the padding */}
      <CssBaseline />
      <Header />
      {/* for sharing spaces we are using the grid, so that we get enough space to show the places data  */}
      <Grid container style={{ width: "100%" }}>
        {/* this grid is for the list  */}
        {/* here if this list will take 4 slots then the map will take the 8 slots because there are total 12 slots in the grid */}
        <Grid xs={12} md={4}>
          <List
            type={type}
            setType={(type) => {
              setType(type);
            }}
            //here this child clicked line is very important otherwise we will not get the data about which child is clicked, because we will access it in the list component
            childClicked={childClicked}
            isLoading={isLoading}
            places={places}
          />
        </Grid>
        {/* this grid is used for the map */}
        <Grid xs={12} md={8}>
          <Map
            coords={coords}
            places={places}
            setBounds={(bounds) => {
              setBounds(bounds);
            }}
            setCoords={(coordinates) => {
              setCoords(coordinates);
            }}
            setChildClicked={(child) => {
              setChildClicked(child);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
