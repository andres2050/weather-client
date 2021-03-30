import {Grid} from "@material-ui/core";
import React from "react";
import {WeatherResponse} from "../models/weather";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 400
    }
}));

interface ShowCityWeatherProps {
    Data: WeatherResponse
}

export const ShowCityWeather: React.FC<ShowCityWeatherProps> = ({Data}) => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <p className={classes.root}><strong>Ciudad:</strong> {Data.city}, {Data.country}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className={classes.root}><strong>Temperatura:</strong> {Data.temperature} <strong>ºC</strong>
                        </p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <p className={classes.root}><strong>Descripcion:</strong> {Data.response.weather[0].description}
                            <img src={`http://openweathermap.org/img/wn/${Data.response.weather[0].icon}.png`}/></p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className={classes.root}><strong>Humedad:</strong> {Data.response.main.humidity}%</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <p className={classes.root}><strong>Temperatura
                            Max/Min:</strong> {Data.response.main.temp_max}/{Data.response.main.temp_min}
                            <strong> ºC</strong></p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className={classes.root}><strong>Sensacion termica:</strong> {Data.response.main.feels_like}
                            <strong> ºC</strong></p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <p className={classes.root}><strong>Fecha consulta:</strong> {Data.created}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className={classes.root}></p>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}