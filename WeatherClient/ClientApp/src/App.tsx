import React from 'react';
//import './App.css';
import {CityInput} from "./components/CityInput";
import {useDispatch, useSelector} from "react-redux";
import { actionCreators, WeatherState } from "./store/weather";

function App() {
  const currentCity = useSelector<WeatherState, WeatherState["city"]>((state => state.city));
  const weather = useSelector<WeatherState, WeatherState["weather"]>((state => state.weather));
  const weatherHistory = useSelector<WeatherState, WeatherState["weatherHistory"]>((state => state.weatherHistory));
  const dispatch = useDispatch()
  
  const onAddCity = (city: string) => {
      actionCreators.requestWeather(city, dispatch, currentCity)
  }
  
  
  return (
      <>
        <CityInput searchCity={onAddCity} />
        <hr />
        <h2>{weather.name}</h2>
        <h2>{weather.temp}</h2>
      </>
  );
}

export default App;
