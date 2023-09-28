// file with logic of all the visits data manipulation
import { dbInsert } from "../../db";
import { actions } from "../actions";

const initalState = {
    progressNotes: [],
    patientDetailList: [],
    patientList: [],
    error: { errType: null, errMessage: null },
    errMessage: "",
    successMessage: "",
};
let newState = {};
const patientsReduces = (state = initalState, action) => {
    switch (action.type) {
        case actions.GET_PATIENTS_LIST:
            newState = {
                ...state,
                patientList: action.payload.patientList,
            };
            return newState;
        case actions.GET_PATIENT_DETAIL:
            newState = {
                ...state,
                patientDetailList: [
                    ...state.patientDetailList,
                    action.payload.patientDetail,
                ],
            };
            return newState;
        case actions.GET_PROGRESS_NOTES:
            newState = {
                ...state,
                progressNotes: [
                    ...state.progressNotes,
                    action.payload.progressNotes,
                ],
            };
            return newState;
        case actions.PATIENT_ERROR:
            newState = { ...state, error: action.payload.error };
            return newState;
        case actions.ADD_PROGRESS_NOTES:
            console.log("Adding Progess note", action.payload.patientNumber);
            newState = {
                ...state,
                progressNotes: state.progressNotes.map((notes) => {
                    if (notes.patientNumber == action.payload.patientNumber) {
                        const newNotes = {
                            patientNumber: notes.patientNumber,
                            notesList: [
                                ...notes.notesList,
                                action.payload.progressNote,
                            ],
                        };
                        return newNotes;
                    } else {
                        return { ...notes };
                    }
                }),
            };
            return newState;
        case actions.OFFLINE_PATIENTS:
            return {
                ...state,
                progressNotes:
                    action.payload.patients?.progressNotes ??
                    state.progressNotes,
                patientDetailList:
                    action.payload.patients?.patientDetailList ??
                    state.patientDetailList,
                patientList:
                    action.payload.patients?.patientList ?? state.patientList,
            };
        case actions.PATIENT_CHART_PATH:
            return {
                ...state,
                patientDetailList: state.patientDetailList.map(
                    (patientDetail) => {
                        if (
                            patientDetail.patientNumber ==
                            action.payload.patientNumber
                        ) {
                            patientDetail.chartPath = action.payload.path;
                            return patientDetail;
                        } else return patientDetail;
                    }
                ),
            };
        case actions.PATIENT_DETAIL_LOAD_OFFLINE:
            return {
                ...state,
                patientDetailList: action.payload.patientDetailList,
            };
        case actions.PROGRESS_NOTES_LOAD_OFFLINE:
            return {
                ...state,
                progressNotes: action.payload.progressNotes,
            };
        default:
            return { ...state };
    }
};

export default patientsReduces;
