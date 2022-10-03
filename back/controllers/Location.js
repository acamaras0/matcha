import geoip from "geoip-lite";
import { publicIpv4 } from "public-ip";

export const location = async (req, res) => {
  publicIpv4().then((ip) => {
    const geo = geoip.lookup(ip);
    return res.send(geo.ll)
  });
};