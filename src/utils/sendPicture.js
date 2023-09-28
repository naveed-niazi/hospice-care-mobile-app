import { AGENCY_DEMO } from "../constants";
import store from "../store";

export const shareImage = (profileURL, patientNumber, next) => {
    console.log("sharing image", profileURL, patientNumber);
    const authToken = store.getState().auth.authInfo.access_token;
    var photo = {
        uri: profileURL,
        type: "image/jpeg",
        name: "photo.jpg",
    };

    var form = new FormData();
    form.append("file", photo);

    fetch(
        `https://document-server-qa.gca-dev.hopsice.com/photouploadservice/patient/${AGENCY_DEMO}/${patientNumber}/`,
        {
            body: form,
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + authToken,
            },
        }
    )
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
            next({ status: false });
        })
        .then((responseData) => {
            responseData.status = true;
            next(responseData);
        })
        .done();
};
