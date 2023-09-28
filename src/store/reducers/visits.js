// file with logic of all the visits data manipulation

import { actions } from "../actions";

const initalState = {
    personVisitsList: [],
    visitDetailList: [],
    error: { errType: null, errMessage: null },
    successMessage: "",
    offlineStats: [],
    offlineMessages: [],
};
let newState = {};
const visitsReducer = (state = initalState, action) => {
    switch (action.type) {
        case actions.GET_VISITS_LIST:
            newState = {
                ...state,
                personVisitsList: action.payload.personVisitsList,
                offlineStats: action.payload.personVisitsList.map((visit) => {
                    const stat = state.offlineStats.find(
                        (stat) => stat.visitId == visit.id
                    );
                    if (stat) return stat;
                    else
                        return {
                            visitId: visit.id,
                            status: visit.status ?? "Pending",
                            syntTime: Date.now(),
                        };
                }),
            };
            return newState;
        case actions.GET_VISIT_DETAIL:
            newState = {
                ...state,
                visitDetailList: [
                    ...state.visitDetailList,
                    action.payload.visit,
                ],
            };
            return newState;
        case actions.VISIT_ACTIONS_ERROR:
            newState = {
                ...state,
                error: action.payload.error,
            };

            return newState;
        case actions.ADD_VISIT_ADDRESS:
            newState = {
                ...state,
                personVisitsList: state.personVisitsList.map((visit) => {
                    if (
                        visit.patientnumber ==
                        action.payload.detail.patientNumber
                    ) {
                        visit.address = action.payload.detail.primaryAddress;
                        visit.location = action.payload.detail.location;
                        return visit;
                    } else return visit;
                }),
            };
            return newState;
        case actions.OFFLINE_VISITS:
            return {
                ...state,
                personVisitsList:
                    action.payload.visits?.personVisitsList ??
                    state.personVisitsList,
                visitDetailList:
                    action.payload.visits?.visitDetailList ??
                    state.visitDetailList,
            };
        case actions.VISIT_UPDATE_STATUS:
            const offlineStats = state.offlineStats.map((stat) => {
                if (stat.visitId == action.payload.visitId) {
                    stat.status = "Completed";
                    return stat;
                } else return stat;
            });
            return {
                ...state,
                offlineStats: [...offlineStats],
            };
        case actions.SAVE_NOTES_OFFLINE:
            return {
                ...state,
                offlineMessages: [...state.offlineMessages, action.payload],
            };
        case actions.POST_OFFLINE_NOTE:
            return {
                ...state,
                offlineMessages: state.offlineMessages.filter(
                    (message) => message.data != action.payload.notePosted
                )
            };
        default:
            return state;
    }
};
export default visitsReducer;
