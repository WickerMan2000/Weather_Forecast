import React, { Fragment, useEffect, useState } from 'react';

const SuggestedCities = ({ city, suggestedCity }) => {
    const [listOfCities, setListOfCities] = useState([]);

    const chooseCity = event => {
        const { value } = event.target;
        suggestedCity(value);
    }

    useEffect(() => {
        const cities = [];
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${10}&appid=3aaac1f503cd848c0e19620ef3ece574`)
            .then(response => response.json())
            .then(result => {
                result.forEach(({ country, name, state }) => cities.push({
                    country: country,
                    name: name,
                    state: state ? state : '',
                }))
                setListOfCities(cities);
            })
            .catch(err => err.message)
    }, [city])

    return (
        <Fragment>
            {listOfCities.map(({ country, name, state }, index) =>
                <option key={index} onClick={chooseCity}>{`${name} ${state} ${country}`}</option>)}
        </Fragment>
    );
}

export default SuggestedCities;