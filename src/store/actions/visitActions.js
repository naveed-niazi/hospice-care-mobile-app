import { ACs, actions } from ".";
import store from "..";
import api from "../../api";
import * as FileSystem from "expo-file-system";

import {
    VISIT_DETAIL_ERROR,
    VISIT_LIST_ERROR,
    INFORMATION_EXISTS,
    AGENCY_DEMO,
    PROGRESS_NOTES_ERROR,
} from "../../constants";
import db, { dbInsert } from "../../db";
import utils from "../../utils";
import {
    GET_PATIENT_DETAIL,
    GET_PROGRESS_NOTES,
    PATIENT_ERROR,
} from "./patientActions";

export const GET_VISITS_LIST = "GET_VISITS_LIST";
export const GET_VISIT_DETAIL = "GET_VISIT_DETAIL";
export const LOADING_VISIT_LIST = "LOADING_VISIT_LIST";
export const ADD_VISIT_ADDRESS = "ADD_VISIT_ADDRESS";
export const VISIT_ACTIONS_ERROR = "VISIT_ACTIONS_ERROR";
export const VISIT_UPDATE_STATUS = "VISIT_UPDATE_STATUS";
export const PROGRESS_NOTES_OFFLINE_SUCCESS = "PROGRESS_NOTES_OFFLINE_SUCCESS";
export const PATIENT_DETAIL_OFFLINE_SUCCESS = "PATIENT_DETAIL_OFFLINE_SUCCESS";

//----
export const getVisitsList = (next) => {
    return (dispatch) => {
        // const isConnected = store.getState().auth.isOnline;
        // if (isConnected) {
        api.get("/proxy/pgrest/api/query/rpc/getpatientvisitsforperson", {
            headers: {
                "accept-profile": "pimreader",
            },
            params: {
                p_visitstatus: "In Progress",
                p_latest: false,
                agency: "demo1",
                p_personnumber: 48,
                p_person_id: -48,
            },
        })
            .then((res) => {
                // getting the patient detail based on the people in visits
                dispatch({
                    type: GET_VISITS_LIST,
                    payload: { personVisitsList: res.data },
                });
                const patientNumbers = res.data.map(
                    (item) => item.patientnumber
                );

                dispatch(getPatientDetailInBulk(patientNumbers));

                if (next) next();
            })
            .catch((err) => {
                dispatch({
                    type: VISIT_ACTIONS_ERROR,
                    payload: {
                        error: {
                            type: VISIT_LIST_ERROR,
                            errMessage: "Unable to load visit list",
                        },
                    },
                });
                if (next) next();
            });
        // } else {
        //     // we will try and get data from the database
        //     console.log("getting informatin offline");
        //     db.get("visits")
        //         .then((data) => {
        //             dispatch({
        //                 type: GET_VISITS_LIST,
        //                 payload: { personVisitsList: data.personVisitsList },
        //             });
        //             if (next) next();
        //         })
        //         .catch((err) => {
        //             dispatch({
        //                 type: VISIT_ACTIONS_ERROR,
        //                 payload: {
        //                     error: {
        //                         type: VISIT_LIST_ERROR,
        //                         errMessage: "Unable to load visit list",
        //                     },
        //                 },
        //             });
        //             if (next) next();
        //         });
        // }
    };
};

export const getVisitDetails = (visit) => {
    const { id, role_id, patient_id } = visit;

    return (dispatch) => {
        // first we will check if the data already exist
        const visitDetailList = store.getState().visits.visitDetailList;
        const data = visitDetailList.find((detail) => detail.id == id);
        if (!data) {
            api.get(
                `/proxy/pim/web/api/patientvisits/${patient_id}/visits/${id}`,
                {
                    headers: {
                        "accept-profile": "pimreader",
                    },
                    params: {
                        agency: "demo1",
                        siteId: 17,
                        roleId: role_id,
                    },
                }
            )
                .then((res) => {
                    dispatch({
                        type: GET_VISIT_DETAIL,
                        payload: { visit: { id: id, visitDetail: res.data } },
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: VISIT_ACTIONS_ERROR,
                        payload: {
                            error: {
                                type: VISIT_DETAIL_ERROR,
                                errMessage: "Unable to load visit detail",
                            },
                        },
                    });
                });
        }
    };
};
export const updateVisitStatus = (visitId) => {
    return { type: VISIT_UPDATE_STATUS, payload: { visitId } };
};

export const getPatientDetailInBulk = (list) => {
    return async (dispatch) => {
        const uniqueList = new Set(list);
        let index = 0;
        let notesCount = 0;
        for (let patientNumber of uniqueList) {
            api.get(
                `/proxy/pim/web/api/patients/${patientNumber}/patientHeader`,
                {
                    params: { agence: AGENCY_DEMO },
                }
            )
                .then(
                    async (res) => {
                        // // got the location, now will get the lat lng
                        const address = `${
                            (res?.data?.entity?.primaryAddress?.street1 ??
                                res?.data?.entity?.primaryAddress?.street1 ??
                                "") +
                            (res?.data?.entity?.primaryAddress?.county ?? "") +
                            (res?.data?.entity?.primaryAddress?.city ?? "") +
                            (res?.data?.entity?.primaryAddress?.state ?? "") +
                            (res?.data?.entity?.primaryAddress?.country ?? "")
                        }`;

                        const location = await utils.getLatLong(address);
                        res.data.entity.location = location;
                        dispatch({
                            type: ADD_VISIT_ADDRESS,
                            payload: { detail: res?.data?.entity },
                        });
                        const temp = {
                            id: res?.data?.entity?.id,
                            siteId: res?.data?.entity?.siteId,
                            patientNumber: res?.data?.entity?.patientNumber,
                            firstName: res?.data?.entity?.firstName,
                            lastName: res?.data?.entity?.lastName,
                            dateOfBirth: res?.data?.entity?.dateOfBirth,
                            sex: res?.data?.entity?.sex,
                            primaryPhone: res?.data?.entity?.primaryPhone,
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
                        dispatch(ACs.getProgressNotes(patientNumber));
                    },
                    (err) => {
                        // do nothing for now
                        console.log(err);
                    }
                )
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    ++index;
                    console.log("detail", index);
                    if (index == uniqueList.size - 1) {
                        const patientDetailList =
                            store.getState().patients.patientDetailList;
                        dbInsert(
                            "patientDetailList",
                            { patientDetailList },
                            () => {
                                dispatch({
                                    type: PATIENT_DETAIL_OFFLINE_SUCCESS,
                                });
                            }
                        );
                    }
                });
            // time to to make request for progress notes right not
            const progressNotesList = store.getState().patients.progressNotes;
            const exist = progressNotesList.find(
                (notes) => notes.patientNumber == patientNumber
            );

            if (!exist) {
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
                    .catch((err) => {})
                    .finally(() => {
                        ++notesCount;
                        console.log("notes", notesCount);
                        if (notesCount == uniqueList.size - 1) {
                            const progressNotes =
                                store.getState().patients.progressNotes;
                            dbInsert("progressNotes", { progressNotes }, () => {
                                dispatch({
                                    type: PROGRESS_NOTES_OFFLINE_SUCCESS,
                                });
                            });
                        }
                    });
            } else {
                ++notesCount;
                if (notesCount == uniqueList.size - 1) {
                    const progressNotes =
                        store.getState().patients.progressNotes;
                    dbInsert("progressNotes", { progressNotes }, () => {
                        dispatch({
                            type: PROGRESS_NOTES_OFFLINE_SUCCESS,
                        });
                    });
                }
            }
            // this method will store file in memory (one by one)
            try {
                dispatch(ACs.storeFileInMemory(patientNumber));
            } catch (err) {
                console.log("Unable to load files", err);
            }
        } // loop ends here
    };
};
