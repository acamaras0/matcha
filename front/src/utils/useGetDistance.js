import { useEffect, useState } from "react";
import { getDistance } from "geolib";
import axios from "axios";
import useGeoLocation from "./useGeoLocation";

const useGetDistance = () => {
  const location = useGeoLocation();
  const [matchLocation, setMatchLocation] = useState([]);

  useEffect(() => {
    getCoordinates();
  }, []);

  const getCoordinates = async () => {
    try{
      const response = await axios.get("http://localhost:5000/coordinates");
      setMatchLocation(response.data);
    }
    catch (error) {
      console.log(error);
    }
  };

  for (let i = 0; i < matchLocation.length; i++) {
    const distance = getDistance(
      {
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
      },
      {
        latitude: matchLocation[i].geo_lat,
        longitude: matchLocation[i].geo_long,
      }
    );
    matchLocation[i].distance = distance;
  }
  return matchLocation;
};

export default useGetDistance;
