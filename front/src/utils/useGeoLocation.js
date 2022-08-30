import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation is not available",
      });
      setLocation((state) => ({
        ...state,
        loaded: true,
        error: {
          code: 0,
          message: "Geolocation is not supported by your browser",
        },
      }));
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  // fetch(
  //   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //     location.coordinates.lat +
  //     "," +
  //     location.coordinates.lng +
  //     "&key=AIzaSyDhF60vnq16OGzqjgpXj5WemUR1Eg4K6sU"
  // )
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log(
  //       "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
  //     );
  //   });
  // const geocoder = new window.google.maps.Geocoder();
  // const my_location = {
  //   lat: location.coordinates.lat,
  //   lng: location.coordinates.lng,
  // };

  return location;
};

export default useGeoLocation;
