import { WATER_CONSUMPTION } from "./constants";

const initalState = {
    todaysWaterConsumption: []
}

const reducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case WATER_CONSUMPTION:
            return {
                ...state,
                todaysWaterConsumption: [...state.todaysWaterConsumption, payload]
            }
        default:
            return state
    }
}

export default reducer