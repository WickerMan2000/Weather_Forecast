import React, { useContext } from 'react';
import Carousel from 'react-elastic-carousel';
import InputContext from '../store/InputContext';
import Image from './Image';
import styles from './Forecast.module.css';

const Forecast = ({ style }) => {
    const { cityWeatherDetails: { list = [] } } = useContext(InputContext);

    return (
        <div style={style}>
            <Carousel
                itemPadding={[10, 20]}
                breakPoints={[{ width: 1000, itemsToShow: 5 }]}>
                {list.map(({ dt, main: { temp }, weather }, index) =>
                    <article className={styles.DayDetails} key={index}>
                        <h1>{new Date(dt * 1000).toLocaleDateString('en-EN', { 'weekday': 'long' })}</h1>
                        <Image icon={weather[0].icon} desc={weather[0].description} />
                        <h2>{new Date(dt * 1000).toLocaleTimeString('en-EN', { hour: '2-digit', minute: '2-digit' })}</h2>
                        <p className={styles.DayTemperature}><span>{Math.round(temp)}</span>&deg;C</p>
                    </article>
                )}
            </Carousel>
        </div>
    );
}

export default Forecast;