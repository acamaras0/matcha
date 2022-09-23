// import { useEffect, useState } from "react";
// import axios from "axios";

// const useGeoLocation = () => {
//   const [location, setLocation] = useState({
//     loaded: false,
//     coordinates: { lat: "", lng: "" },
//   });



//   const onSuccess = (location) => {
//     setLocation({
//       loaded: true,
//       coordinates: {
//         lat: location.coords.latitude,
//         lng: location.coords.longitude,
//       },
//     });
//   };

//   const onError = (error) => {
//     setLocation({
//       loaded: true,
//       error,
//     });
//   };

//   // useEffect(() => {
//   //   const getLocation = async () => {
//   //     const gps = await axios.get("http://localhost:5000/location");
//   //     // console.log(gps.data);
//   //     setGeo("here",gps.data)
//   //   };
//   //   getLocation();
//   // }, []);

//   // console.log(location);
//   useEffect(() => {
//     if (!("geolocation" in navigator)) {
//       onError({
//         code: 0,
//         message: "Geolocation is not available",
//       });
//       setLocation((state) => ({
//         ...state,
//         loaded: true,
//         error: {
//           code: 0,
//           message: "Geolocation is not supported by your browser",
//         },
//       }));
//     }

//     navigator.geolocation.getCurrentPosition(onSuccess, onError);
//   }, []);

//   return location;
// };

// export default useGeoLocation;
