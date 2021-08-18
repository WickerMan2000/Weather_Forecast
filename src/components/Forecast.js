import React, { useContext } from 'react';
import Carousel from 'react-elastic-carousel';
import InputContext from '../store/InputContext';

const Forecast = ({ styles }) => {
    const { cityWeatherDetails: { list = [] } } = useContext(InputContext);

    return (
        <div style={styles}>
            <Carousel
                itemPadding={[10, 50]}
                breakPoints={[{ width: 1000, itemsToShow: 5 }]}>
                {list.map(({ dt, main: { temp } }, index) =>
                    <article key={index}>
                        <h1>{new Date(dt * 1000).toLocaleDateString('en-EN', { 'weekday': 'long' })}</h1>
                        <h2>{new Date(dt * 1000).toLocaleTimeString('en-EN', { hour: '2-digit', minute: '2-digit' })}</h2>
                        <p><span>{Math.round(temp)}</span>&deg;C</p>
                    </article>)}
            </Carousel>
        </div>
    );
}

export default Forecast;