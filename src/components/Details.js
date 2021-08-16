import React, { Fragment, useContext, useEffect, useState } from 'react';
import InputContext from '../store/InputContext';

const Details = () => {
    const { cityWeatherDetails } = useContext(InputContext);
    const [forecastList, setForecastList] = useState([]);
    const [city, setCity] = useState({});

    useEffect(() => {
        const details = Object.values(cityWeatherDetails).filter(element => typeof element === 'object');
        setForecastList(details[0]);
        setCity(details[1]);
    }, [cityWeatherDetails])

    return (
        <Fragment>
            <div>{city && city.name}, {city && city.country}</div>
        </Fragment>
    );
}

export default Details;