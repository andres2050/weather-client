import {createStore} from "redux";
import * as weather from "./weather";

export const store = createStore(weather.reducer)