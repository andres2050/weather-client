import {OpenWeatherMap, WeatherResponse} from "../models/weather"
import {Dispatch} from "redux";

const requestWeatherType = 'REQUEST_WEATHER';
const receiveWeatherType = 'RECEIVE_WEATHER';
const requestLastSearchesType = 'REQUEST_LAST_SEARCHES';
const receiveLastSearchesType = 'RECEIVE_LAST_SEARCHES';
const requestWeatherHistoryType = 'REQUEST_WEATHER_HISTORY';
const receiveWeatherHistory = 'RECEIVE_WEATHER_HISTORY';

export interface WeatherState {
    city: string
    weather: WeatherResponse
    lastSearches: WeatherResponse[]
    historyRecord: WeatherResponse
    historyID: number
}

const initalState = <WeatherState> {
    city: "",
    weather: <WeatherResponse> {},
    lastSearches: <WeatherResponse[]> [],
    historyRecord: <WeatherResponse> {},
    historyID: NaN
}

export const actionCreators = {
    requestWeather: async (dispatch: Dispatch, city: string, currentCity: string) => {
        if(city === currentCity) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        
        dispatch<Action>({ type: requestWeatherType, payload: city });
        const url = `api/weather/current?city=${city}`;
        const response = await fetch(url);
        const weather = await response.json();
        dispatch<Action>({ type: receiveWeatherType, payload: city, result: weather });
    },
    requestLastSearches: async (dispatch: Dispatch) => {
        dispatch<Action>({ type: requestLastSearchesType, payload: "request" });
        const url = `api/weather/LastSearches`;
        const response = await fetch(url);
        const weather = await response.json();
        dispatch<Action>({ type: receiveLastSearchesType, payload: "receive", result: weather });
    },
    requestShowHistoryWeather: async (dispatch: Dispatch, id: number) => {
        dispatch<Action>({ type: requestWeatherHistoryType, payload: id.toString() });
        const url = `api/weather/${id}`;
        const response = await fetch(url);
        const weather = await response.json();
        dispatch<Action>({ type: receiveWeatherHistory, payload: id.toString(), result: weather });
    }
}

type Action = { type: string, payload: string, result?: any }

export const reducer = (state: WeatherState = initalState, action: Action) => {
    switch (action.type) {
        case requestWeatherType: {
            return {...state, city: action.payload, historyRecord: <WeatherResponse> {}, historyID: NaN}
        }
        case receiveWeatherType: {
            return {...state, weather: <WeatherResponse> action.result}
        }
        case requestLastSearchesType: {
            return {...state}
        }
        case receiveLastSearchesType: {
            return {...state, lastSearches: <WeatherResponse[]> action.result}
        }
        case requestWeatherHistoryType: {
            return {...state, historyID: Number(action.payload), weather: <WeatherResponse> {}, city: ""}
        } 
        case receiveWeatherHistory: {
            return {...state, historyRecord: <WeatherResponse> action.result}
        }
        default:
            return state
    }
}