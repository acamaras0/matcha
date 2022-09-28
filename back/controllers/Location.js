import geoip from "geoip-lite";
import { publicIpv4 } from "public-ip";

function getDistanceFromLatLonInKm(lat, lng, lat_1, lon_1) {
  const deg2rad = (deg) => (deg * Math.PI) / 180.0;

  let geo_lat = lat;
  let geo_long = lng;
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat_1 - geo_lat); // deg2rad below
  var dLon = deg2rad(lon_1 - geo_long);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(geo_lat)) *
      Math.cos(deg2rad(lat_1)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

export const location = async (req, res) => {
  publicIpv4().then((ip) => {
    const geo = geoip.lookup(ip);
    return res.send(geo.ll)
  });
};