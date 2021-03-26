import {ResponseWeather} from "../models/weather"
import {Dispatch} from "redux";

const requestWeatherType = 'REQUEST_WEATHER';
const receiveWeatherType = 'RECEIVE_WEATHER';

export interface WeatherState {
    city: string
    weather: ResponseWeather
    weatherHistory: ResponseWeather[]
    isLoading: boolean
}

const initalState = <WeatherState> {
    city: "",
    weather: <ResponseWeather> {},
    weatherHistory: <ResponseWeather[]> [],
    isLoading: false
}

export const actionCreators = {
    requestWeather: async (city: string, dispatch: Dispatch, currentCity: string) => {
        if(city === currentCity) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        
        dispatch<Action>({ type: requestWeatherType, payload: city });
        const url = `api/weather/current?city=${city}`;
        const response = await fetch(url);
        const weather = await response.json();
        dispatch<Action>({ type: receiveWeatherType, payload: city, result: weather });
    }
}

type Action = { type: string, payload: string, result?: any }

export const reducer = (state: WeatherState = initalState, action: Action) => {
    switch (action.type) {
        case requestWeatherType: {
            return {...state, city: action.payload}
        }
        case receiveWeatherType: {
            return {...state, weather: <ResponseWeather> action.result}
        }
        default:
            return state
    }
}