import api from "../../api";
import * as FileSystem from "expo-file-system";
import {
    PATIENT_DETAIL_ERROR,
    PATIENT_LIST_ERROR,
    PROGRESS_NOTES_ERROR,
    AGENCY_DEMO,
    ADD_NOTES_ERROR,
    INFORMATION_EXISTS,
} from "../../constants";
import store from "..";
import db, { dbInsert } from "../../db";
import utils from "../../utils";
var qs = require("qs");

//---actions
export const GET_PATIENTS_LIST = "GET_PATIENTS_LIST";
export const GET_PATIENT_DETAIL = "GET_PATIENT_DETAIL";
export const GET_PROGRESS_NOTES = "GET_PROGRESS_NOTES";
export const ADD_PROGRESS_NOTES = "ADD_PROGRESS_NOTES";
export const PATIENT_CHART_PATH = "PATIENT_CHART_PATH";
export const SAVE_NOTES_OFFLINE = "SAVE_NOTES_OFFLINE";
export const POST_OFFLINE_NOTE = "POST_OFFLINE_NOTE";
export const PATIENT_ERROR = "PATIENT_ERROR";
export const PATIENT_DETAIL_LOAD_OFFLINE = "PATIENT_DETAIL_LOAD_OFFLINE";
export const PROGRESS_NOTES_LOAD_OFFLINE = "PROGRESS_NOTES_LOAD_OFFLINE";

//---action creators (ACs)
export const getPatientsList = (offset = -1, pageSize = 5000, next) => {
    return async (dispatch) => {
        var body = JSON.stringify({
            filterDate: "2022-01-01T12:00:00",
            patientFilter: "AllPatients",
            offSet: offset,
            pageSize: pageSize,
            siteFilter: "ThisSite",
            statusFilter: "ActivePatients",
            showDischargedPatientsFirst: false,
            programId: null,
        });
        api.post("/proxy/pim/web/api/patients/listing", body, {
            params: {
                agency: "demo1",
                limit: 25,
            },
        })
            .then((response) => {
                dispatch({
                    type: GET_PATIENTS_LIST,
                    payload: { patientList: response.data },
                });
                if (next) next();
            })
            .catch((err) => {
                dispatch({
                    type: PATIENT_ERROR,
                    payload: {
                        error: {
                            errType: PATIENT_LIST_ERROR,
                            errMessage: "Unable to load patients list",
                        },
                    },
                });
                if (next) next();
            });
    };
};
export const storeFileInMemory = (patientNumber, next) => {
    console.log("store File in Memory", patientNumber);
    return (dispatch) => {
        api.get(
            `/proxy/facesheet/v1/facesheets/${AGENCY_DEMO}/${patientNumber}.html`
        )
            .then((res) => {
                const fileContent = res.data;
                const path =
                    FileSystem.documentDirectory + `${patientNumber}.html`;
                FileSystem.writeAsStringAsync(path, fileContent, {
                    encoding: FileSystem.EncodingType.UTF8,
                }).then((data) => {
                    dispatch({
                        type: PATIENT_CHART_PATH,
                        payload: { path, patientNumber },
                    });
                    if (next) next(path);
                });
            })
            .catch((err) => {
                console.log("Unable to get file", err);
            });
    };
};
export const getPatientDetail = (patientNumber) => {
    return async (dispatch) => {
        api.get(`/proxy/pim/web/api/patients/${patientNumber}/patientHeader`, {
            params: { agence: AGENCY_DEMO },
        }).then(
            (res) => {
                // i will be storing limited information from the patient detail (Storage constraint)
                const temp = {
                    id: res.data.entity?.id,
                    siteId: res.data.entity?.siteId,
                    patientNumber: res.data.entity?.patientNumber,
                    firstName: res.data.entity?.firstName,
                    lastName: res.data.entity?.lastName,
                    dateOfBirth: res.data.entity?.dateOfBirth,
                    sex: res.data.entity?.sex,
                    primaryPhone: res.data.entity?.primaryPhone,
                    primaryAddress: res.data.entity?.primaryAddress,
                };
                dispatch({
                    type: GET_PATIENT_DETAIL,
                    payload: {
                        patientDetail: {
                            ...temp,
                            toGetBy: patientNumber,
                        },
                    },
                });
            },
            (err) =>
                dispatch({
                    type: PATIENT_ERROR,
                    payload: {
                        error: {
                            errMessage: "Unable to load patient data",
                            errType: PATIENT_DETAIL_ERROR,
                        },
                    },
                })
        );
    };
};

export const getProgressNotes = (patientNumber) => {
    // first we will check if the data is already there so we don't keep loading data again and again
    return async (dispatch) => {
        const progressNotesList = store.getState().patients.progressNotes;
        const exist = progressNotesList.find(
            (notes) => notes.patientNumber == patientNumber
        );
        if (exist) {
            return dispatch({ type: INFORMATION_EXISTS });
        }

        api.get(
            `/proxy/observation/observation/patientprogressnotes/patient/${patientNumber}`,
            {
                params: {
                    agency: AGENCY_DEMO,
                },
            }
        )
            .then((res) => {
                dispatch({
                    type: GET_PROGRESS_NOTES,
                    payload: {
                        progressNotes: {
                            patientNumber,
                            notesList: res.data.reverse(),
                        },
                    },
                });
            })
            .catch((err) => {
                dispatch({
                    type: PATIENT_ERROR,
                    payload: {
                        error: {
                            errMessage: "Unable to load patients data",
                            errType: PROGRESS_NOTES_ERROR,
                        },
                    },
                });
            })
            .catch((err) => {});
    };
};
export const notesStoreOffline = (message, visitId, patientNumber) => {
    console.log("uploading patinet notes");
    return (dispatch) => {
        const userInfo = store.getState().user.userInfo;
        dispatch({
            type: SAVE_NOTES_OFFLINE,
            payload: { message, visitId, patientNumber, data: Date.now() },
        });

        dispatch({
            type: ADD_PROGRESS_NOTES,
            payload: {
                patientNumber,
                progressNote: {
                    note: message,
                    noteddatetime: utils.dateAnd12HoursTime(Date.now()),
                    personname: `${userInfo.firstName} ${userInfo.lastName}`,
                },
            },
        });

        try {
            const progressNotes = store.getState().patients.progressNotes;
            dbInsert("progressNotes", {
                progressNotes,
            });
        } catch (err) {}
    };
};
export const postOfflineNotes = (notes, visitId, sync) => {
    // if i get the notes then fine other wise I will post all the notes

    return (dispatch) => {
        if (!notes) {
            console.log("now getting the data from store");
            notes = store.getState().visits.offlineMessages;
        }
        console.log(notes);
        let tempCount = 1;
        // now we have the notes we will loop over each on and call postProgressNotes
        try {
            notes.forEach((note) =>
                dispatch(
                    postProgressNotes(
                        note.patientNumber,
                        note.message,
                        visitId,
                        (condition) => {
                            ++tempCount;
                            if (tempCount == notes.length) {
                                try {
                                    const progressNotes =
                                        store.getState().patients.progressNotes;
                                    dbInsert("progressNotes", {
                                        progressNotes,
                                    });
                                } catch (err) {}
                            }
                            if (condition) {
                                console.log("Removing from the list");
                                dispatch({
                                    type: POST_OFFLINE_NOTE,
                                    payload: { notePosted: note.data },
                                });
                            }
                        },
                        sync
                    )
                )
            );
        } catch (err) {
            console.log(err);
        }
    };
};
export const postProgressNotes = (
    patientNumber,
    message,
    visitId,
    next,
    sync
) => {
    console.log("post request for notes is being made");
    const patient = store
        .getState()
        .patients.patientDetailList.find(
            (patient) => patient.patientNumber == patientNumber
        );
    const userInfo = store.getState().user.userInfo;

    var d = new Date(),
        dformat =
            [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-") +
            " " +
            [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
    return async (dispatch) => {
        var body = JSON.stringify({
            patientprogressnoteentitydto: null,
            id: 322,
            patientnumber: patient.patientNumber,
            patientid: patient.id,
            personid: userInfo.personId,
            personnumber: userInfo.personNumber,
            personname: `${userInfo.firstName} ${userInfo.lastName}`,
            credentials: null,
            modifiedpersonid: "",
            modifiedpersonnumber: "",
            modifiedpersonname: "",
            modifiedcredentials: "",
            siteid: userInfo.sites[0].id,
            sitetimezone: "America/Chicago",
            note: message,
            noteddatetime: dformat,
            modifieddatetime: "",
        });
        api.post("/proxy/observation/observation/patientprogressnote", body, {
            params: {
                agency: "demo1",
                ignoreentitydto: true,
            },
        })
            .then((res) => {
                console.log("@@@@@@@@@@@@@@@@", patientNumber, message);
                if (!sync) {
                    dispatch({
                        type: ADD_PROGRESS_NOTES,
                        payload: {
                            patientNumber,
                            progressNote: res.data,
                        },
                    });
                    try {
                        const progressNotes =
                            store.getState().patients.progressNotes;
                        dbInsert("progressNotes", {
                            progressNotes,
                        });
                    } catch (err) {}
                }

                if (next) next(true);
            })
            .catch((err) => {
                // we will store the data in offline store
                if (!sync)
                    dispatch(
                        notesStoreOffline(message, visitId, patientNumber)
                    );
                console.log(err);
                dispatch({
                    type: PATIENT_ERROR,
                    payload: {
                        error: {
                            errType: ADD_NOTES_ERROR,
                            errMessage: "Unable to post new comment",
                        },
                    },
                });
                if (next) next(false);
            });
    };
};
export const loadPatientDataInReduxFromPouchDB = () => {
    return (dispatch) => {
        try {
            db.get("patientDetailList").then(
                (data) => {
                    console.log(
                        "Patient Detail List Offline",
                        Object.keys(data)
                    );
                    if (
                        data?.patientDetailList &&
                        data.patientDetailList.length > 0
                    )
                        dispatch({
                            type: PATIENT_DETAIL_LOAD_OFFLINE,
                            payload: {
                                patientDetailList: data.patientDetailList,
                            },
                        });
                },
                (error) => {
                    // we can't do anything in case of error
                }
            );
            db.get("progressNotes").then(
                (data) => {
                    console.log(
                        "Progress Notes Load Offline",
                        Object.keys(data)
                    );
                    if (data?.progressNotes && data.progressNotes.length > 0)
                        dispatch({
                            type: PROGRESS_NOTES_LOAD_OFFLINE,
                            payload: { progressNotes: data?.progressNotes },
                        });
                },
                (error) => {
                    // we can't do anything in case of error
                }
            );
        } catch (err) {
            console.log("Unable to Recover Offline Data", err);
        }
    };
};
