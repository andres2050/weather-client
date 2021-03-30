import React from 'react';
import {OpenWeatherMap, WeatherResponse} from '../models/weather';
import {DataGrid, GridCellParams, GridColDef} from '@material-ui/data-grid';
import {Button} from "@material-ui/core";


interface WeatherLastSearchesProps {
    Data: WeatherResponse[];
    ShowSearch(response: number): void;
}

export const WeatherLastSearches: React.FC<WeatherLastSearchesProps> = ({Data, ShowSearch}) => {
    const onShowSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: any) => {
        event.preventDefault();
        ShowSearch(value);
    }
    
    const columns: GridColDef[] = [
        {field: 'city', headerName: 'Ciudad'},
        {field: 'country', headerName: 'Pais'},
        {field: 'temperature', headerName: 'Temperatura'},
        {field: 'created', headerName: 'Fecha busqueda'},
        {
            field: 'id', headerName: 'Acciones',
            renderCell: (params: GridCellParams) => (
                <Button variant="contained"
                        color="primary"
                        size="small"
                        onClick={(event) => onShowSearch(event, params.value)}
                >Ver</Button>
            ),
        },
    ];

    return (
        <div>
            <DataGrid rows={Data} autoHeight columns={columns} pageSize={5}></DataGrid>
        </div>
    );
}