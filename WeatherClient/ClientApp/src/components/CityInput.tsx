import React, {ChangeEvent} from "react";

interface CityInputProps {
    searchCity(city: string): void;
}

export const CityInput:React.FC<CityInputProps> = ({ searchCity }) => {
    const [city, setCity] = React.useState("")
    
    const updateCity = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value)
    }
    
    const onSearchCityClick = () => {
        searchCity(city.trim())
        setCity("")
    }
    
    return (
        <div>
            <input type="text" name="city"
                   value={city}
                   onChange={updateCity}
                   placeholder="Buscar ciudad" />
            <button onClick={onSearchCityClick}>Buscar</button>
        </div>
    );
}