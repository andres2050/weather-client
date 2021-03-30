import React, {useEffect} from 'react';
//import './App.css';
import {CityInput} from "./components/CityInput";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, WeatherState} from "./store/weather";
import {WeatherLastSearches} from "./components/WeatherLastSearches";
import {OpenWeatherMap} from "./models/weather";
import {Card, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ShowCityWeather} from "./components/ShowCityWeather";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 700
    }
}));


function App() {
    const currentCity = useSelector<WeatherState, WeatherState["city"]>((state => state.city));
    const weather = useSelector<WeatherState, WeatherState["weather"]>((state => state.weather));
    const historyWeather = useSelector<WeatherState, WeatherState["historyRecord"]>((state => state.historyRecord));
    const lastSearches = useSelector<WeatherState, WeatherState["lastSearches"]>((state => state.lastSearches));
    const dispatch = useDispatch()

    const onAddCity = (city: string) => {
        actionCreators.requestWeather(dispatch, city, currentCity);
    }

    const onGetLastSearches = () => {
        actionCreators.requestLastSearches(dispatch);
        setTimeout(onGetLastSearches, 10 * 1000);
    }

    const onShowHistoryWeather = (response: number) => {
        actionCreators.requestShowHistoryWeather(dispatch, response)
    }

    const classes = useStyles();

    useEffect(() => {
        onGetLastSearches();
    }, []);

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={10}>
                <Card className={classes.root}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <CityInput searchCity={onAddCity}/>
                    </Grid>
                    <hr/>
                    {JSON.stringify(weather) !== '{}' &&
                    <ShowCityWeather Data={weather}/>
                    }
                    {JSON.stringify(historyWeather) !== '{}' &&
                    <ShowCityWeather Data={historyWeather}/>
                    }
                    <hr/>
                    <WeatherLastSearches Data={lastSearches} ShowSearch={onShowHistoryWeather}/>
                </Card>
            </Grid>
        </Grid>
    );
}

export default App;
