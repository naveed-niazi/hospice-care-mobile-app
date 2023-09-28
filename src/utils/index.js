// all the helper files go there
import { getCamelCase, getInitials } from "./stringManipulation";
import { loginCredVerification } from "./inputVerification";
import { shareImage } from "./sendPicture";
import { getLatLong, getCurrentLocation } from "./location";
import { dateAnd12HoursTime, noteDateFromString } from "./dates";

const utils = {
    getCamelCase,
    getInitials,
    loginCredVerification,
    shareImage,
    getLatLong,
    getCurrentLocation,
    dateAnd12HoursTime,
    noteDateFromString,
};
export default utils;
