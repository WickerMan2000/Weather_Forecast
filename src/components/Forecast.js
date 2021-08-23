import React, { useContext } from 'react';
import Carousel from 'react-elastic-carousel';
import InputContext from '../store/InputContext';
import Information from './Information';

const Forecast = ({ style }) => {
    const { cityWeatherDetails: { list = [] } } = useContext(InputContext);

    return (
        <div style={style}>
            <Carousel
                itemPadding={[10, 20]}
                breakPoints={[{ width: 1000, itemsToShow: 5 }]}>
                {list.map(({ dt, main: { temp }, weather }, index) =>
                    <Information
                        index={index}
                        date={dt}
                        icon={weather[0].icon}
                        description={weather[0].description}
                        temperature={temp} />
                )}
            </Carousel>
        </div>
    );
}

export default Forecast;