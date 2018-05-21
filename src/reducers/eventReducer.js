
const initialState = {
    events:[]
};

export default function dataReducer(state = initialState, action) {
    let newState = Object.assign([], state);
    switch (action.type) {
        case "ADD_EVENT":
            return {
                events:[...state.events, action.event]
            };
            break;
        case "DELETE_EVENT":
            return {
                events: [...state.events.filter(d=>d.id!=action.id)]
            };
            break;
        default:
            return state;
            break;
    }
}
