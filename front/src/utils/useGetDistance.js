/* eslint-disable */
import { useEffect, useState } from "react";
import { getDistance } from "geolib";
import { useCookies } from "react-cookie";
import axios from "axios";

const useGetDistance = () => {
  const [matchLocation, setMatchLocation] = useState([]);
  const [geo, setGeo] = useState("");
  const [cookie, setCookie] = useCookies(["refreshToken"]);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/info/${cookie.refreshToken}`
        );
        setMatchLocation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCoordinates();
    const getLocation = async () => {
      const gps = await axios.get("http://localhost:5000/location");
      setGeo(gps.data);
    };
    getLocation();
  }, [cookie.refreshToken]);

  if (geo) {
    if (geo[0] && geo[1]) {
      for (let i = 0; i < matchLocation.length; i++) {
        const distance = getDistance(
          {
            latitude: geo[0],
            longitude: geo[1],
          },
          {
            latitude: matchLocation[i].geo_lat,
            longitude: matchLocation[i].geo_long,
          }
        );
        matchLocation[i].distance = distance;
      }
    }
  }
  return matchLocation;
};

export default useGetDistance;
