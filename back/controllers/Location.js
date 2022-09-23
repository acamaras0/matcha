import geoip from "geoip-lite";
import { publicIpv4 } from "public-ip";
import db from "../config/Database.js";

export const location = async (req, res) => {
  publicIpv4().then((ip) => {
    console.log("your public ip address", ip);
    const geo = geoip.lookup(ip);

    console.log(geo.ll);
    // geo.ll.map();
    db.query("INSERT INTO users (geo_lat) VALUES (?)", [geo.ll[0]]);
    db.query("INSERT INTO users (geo_long) VALUES (?)", [geo.ll[1]]);
  });
};
