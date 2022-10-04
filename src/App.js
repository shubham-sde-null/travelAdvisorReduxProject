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
  const [childClicked, setChildClicked] = useState(null);
  useEffect(() => {
    getPlacesData(type);
  }, [type]);
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
            childClicked={childClicked}
            isLoading={isLoading}
            places={places}
          />
        </Grid>
        {/* this grid is used for the map */}
        <Grid xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
