import React from "react";
import {IconButton, InputBase, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Search} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

interface CityInputProps {
    searchCity(city: string): void;
}

export const CityInput: React.FC<CityInputProps> = ({searchCity}) => {
    const [city, setCity] = React.useState("");
    const classes = useStyles();

    const updateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value)
    }

    const onSearchCityClick = (event: React.FormEvent) => {
        event.preventDefault();
        const search = city.trim().toLowerCase();
        if (search === "") {
            return;
        }

        searchCity(search);
        setCity("");
    }

    return (
        <Paper component="form" onSubmit={onSearchCityClick} className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Buscar ciudad"
                value={city}
                onChange={updateCity}
                inputProps={{ 'aria-label': 'Devuelve la informacion climatica en una ciudad' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <Search />
            </IconButton>
        </Paper>
    );
}