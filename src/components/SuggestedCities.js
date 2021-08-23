import React, { Fragment, useEffect, useState } from 'react';

const SuggestedCities = ({ city, suggestedCities }) => {
    const [listOfCities, setListOfCities] = useState([]);

    useEffect(() => {
        const cities = [];
        const abortControl = new AbortController();
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${10}&appid=${process.env.REACT_APP_API_KEY}`, {
            signal: abortControl.signal
        })
            .then(response =>
                response.json()
            )
            .then(result => {
                result.forEach(({ country, name, state }) => cities.push({
                    country: country,
                    name: name,
                    state: state ? state : '',
                }))
                setListOfCities(cities);
            })
            .catch(({ message }) => message)

        return () => abortControl.abort();
    }, [city])

    return (
        <Fragment>
            <datalist id={suggestedCities}>
                {listOfCities.map(({ country, name, state }, index) =>
                    <option key={index}>{`${name}, ${state}${state && ','} ${country}`}</option>)}
            </datalist>
        </Fragment>
    );
}

export default SuggestedCities;