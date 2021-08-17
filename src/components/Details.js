import React, { Fragment, useContext, useEffect, useState } from 'react';
import InputContext from '../store/InputContext';

const Details = React.memo(() => {
    const { cityWeatherDetails } = useContext(InputContext);
    const [forecastList, setForecastList] = useState([]);
    const [city, setCity] = useState({});

    useEffect(() => {
        const details = Object.values(cityWeatherDetails).filter(element => typeof element === 'object');
        setForecastList(details[0]);
        setCity(details[1]);
    }, [cityWeatherDetails])

    // console.log(city);
    // console.log(forecastList);
    console.log(cityWeatherDetails);

    return (
        <Fragment>
            <div>{city && city.name}, {city && city.country}</div>
            {/* <div>{forecastList && forecastList.map(el => <p>{el.dt}</p>)}</div> */}
        </Fragment>
    );
})

export default Details;