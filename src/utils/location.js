import Geocoder from "react-native-geocoding";

import { GOOGLE_MAPS_APIKEY, INFORMATION_EXISTS } from "../constants";
// Initialize the module (needs to be done only once)
Geocoder.init(GOOGLE_MAPS_APIKEY, { language: "en" }); // use a valid API key

// Search by address
export const getLatLong = async (address) => {
    // getting an invalid address (verification criteria could be improved)
    if (address.length < 6) {
        return { lat: null, lng: null };
    }
    return Geocoder.from(address)
        .then((json) => {
            var location = json.results[0].geometry.location;
            return location;
        })
        .catch((error) => {
            return { lat: null, lng: null };
        });
};
