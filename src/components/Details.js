import React, { Fragment, useContext, useEffect, useState } from 'react';
import InputContext from '../store/InputContext';
import Image from './Image';
import styles from './Details.module.css';

const Details = React.memo(() => {
    const { cityWeatherDetails } = useContext(InputContext);
    const [forecastList = [], setForecastList] = useState([]);
    const [city = {}, setCity] = useState({});

    useEffect(() => {
        const details = Object.values(cityWeatherDetails).filter(element => typeof element === 'object');
        const [listOfAllDaysDetails = [], basicCityDetails] = details;
        setForecastList(listOfAllDaysDetails[0]);
        setCity(basicCityDetails);
    }, [cityWeatherDetails])

    return (
        <Fragment>
            <div className={styles.Details}>
                <div className={styles.WeatherDetails}>
                    <div className={styles.CityDetails}>{city.name} {city.country}</div>
                    <div className={[styles.GeneralDetails, styles.HumidityIcon].join(' ')}>
                        <span style={{ marginLeft: 40, fontSize: 30 }}>
                            {forecastList.main && forecastList.main.humidity}%
                        </span>
                    </div>
                    <div className={[styles.GeneralDetails, styles.PressureIcon].join(' ')}>
                        <span style={{ marginLeft: 40, fontSize: 25 }}>
                            {forecastList.main && forecastList.main.pressure}hPa
                        </span>
                    </div>
                    <div className={[styles.GeneralDetails, styles.WindIcon].join(' ')}>
                        <span style={{ marginLeft: 40, fontSize: 25 }}>
                            {forecastList.main && forecastList.wind.speed}m/s
                        </span>
                    </div>
                </div>
                <Image style={{ height: 300, marginLeft: 300 }}
                    icon={forecastList.weather && forecastList.weather[0].icon}
                    desc={forecastList.weather && forecastList.weather.description} />
                <div className={styles.TemperatureDetails}>{forecastList.main && Math.round(forecastList.main.temp)}&deg;C</div>
            </div>
        </Fragment >
    );
})

export default Details;