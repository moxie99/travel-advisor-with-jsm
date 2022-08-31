import React from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./component/Header/Header";
import List from "./component/List/List";
import Map from "./component/Map/Map";
import { getPlacesData, getWeaterData } from "./api";

const App = () => {
  const [places, setPlaces] = React.useState([]);
  const [filteredPlaces, setFilteredPlaces] = React.useState([]);
  const [coordinates, setCoordinates] = React.useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = React.useState(null);
  const [childClicked, setChildClicked] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState("restaurants");
  const [rating, setRating] = React.useState(0);
  const [weatherData, setWeatherData] = React.useState([]);

  React.useEffect(() => {
    // getting user current location
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  React.useEffect(() => {
    const filteredPlaces = places?.filter((place) => place?.rating >= rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  React.useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      setLoading(true);
      // getWeaterData(coordinates.lat, coordinates.lng).then((data) =>
      //   setWeatherData(data)
      // );
      getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setLoading(false);
      });
    }
  }, [type, bounds]);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            loading={loading}
            rating={rating}
            type={type}
            setType={setType}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
