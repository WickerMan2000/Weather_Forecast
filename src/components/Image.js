import React, { Fragment, useEffect, useState } from 'react';

const Image = ({ icon, desc, style }) => {
    const [weatherImage, setWeatherImage] = useState('');

    useEffect(() => {
        const abortControl = new AbortController();
        fetch(`http://openweathermap.org/img/wn/${icon}@2x.png`, {
            signal: abortControl.signal
        })
            .then(response =>
                response.blob()
            )
            .then(result =>
                setWeatherImage(URL.createObjectURL(result))
            )
            .catch(({ message }) =>
                message
            )

        return () => abortControl.abort();
    }, [icon])

    return (
        <Fragment>
            <img style={style} src={weatherImage} alt={desc} />
        </Fragment>
    );
}

export default Image;