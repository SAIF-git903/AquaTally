import { WATER_CONSUMPTION } from "./constants";

const waterConsumption = (today_s_Consumption) => ({
    type: WATER_CONSUMPTION,
    payload: today_s_Consumption
})

export default waterConsumption