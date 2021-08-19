import React, { Fragment, useEffect, useState } from 'react';

const Image = ({ icon, desc }) => {
    const [weatherImage, setWeatherImage] = useState('');

    useEffect(() => {
        fetch(`http://openweathermap.org/img/wn/${icon}@2x.png`)
            .then(response => response.blob())
            .then(result => setWeatherImage(URL.createObjectURL(result)))
            .catch(({ message }) => message)
    }, [icon])

    return (
        <Fragment>
            <img src={weatherImage} alt={desc} />
        </Fragment>
    );
}

export default Image;