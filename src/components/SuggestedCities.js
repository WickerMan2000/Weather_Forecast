import React, { Fragment, useEffect, useState } from 'react';

const SuggestedCities = ({ city, suggestedCities }) => {
    const [listOfCities, setListOfCities] = useState([]);

    const chooseCity = event => {
        const { value } = event.target;
        suggestedCities(value);
    }

    useEffect(() => {
        const cities = [];
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${10}&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(result => {
                result.forEach(({ country, name, state }) => cities.push({
                    country: country,
                    name: name,
                    state: state ? state : '',
                }))
                setListOfCities(cities);
            })
            .catch(({ message }) => message)
    }, [city])

    return (
        <Fragment>
            <datalist id="suggestedCities">
                {listOfCities.map(({ country, name, state }, index) =>
                    <option key={index} onSelect={chooseCity}>{`${name} ${state} ${country}`}</option>)}
            </datalist>
        </Fragment>
    );
}

export default SuggestedCities;