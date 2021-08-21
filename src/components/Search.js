import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import { fecthingData, requestConfiguration } from '../HelperFunctions/myHelperFunctions';
import SuggestedCities from './SuggestedCities';
import InputContext from '../store/InputContext';
import styles from './Search.module.css';

const suggestedCities = "suggestedCities";

const Search = () => {
    const [{ cityData, readyToEnter, showUp, city }, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SEARCHING_FOR_THE_CITY': {
                return {
                    ...state,
                    city: action.cityValue,
                    showUp: action.show
                }
            }
            case 'READY_TO_ENTER': {
                return {
                    ...state,
                    readyToEnter: action.payload
                }
            }
            case 'GET_SUGGESTED_CITY': {
                return {
                    ...state,
                    city: action.cityValue,
                    showUp: action.show
                }
            }
            case 'COLLECTING_DATA': {
                return {
                    ...state,
                    cityData: action.cityDetails,
                    showUp: action.show
                }
            }
            default:
                return state;
        }
    }, {
        cityData: {},
        readyToEnter: false,
        showUp: false,
        city: '',
    });

    const inputCtx = useContext(InputContext);

    const searchingCity = event => {
        let { value } = event.target;
        const upperCity = city.slice(0, 1).toUpperCase() + city.slice(1);
        const indexOfCityName = value.indexOf(upperCity);
        if (indexOfCityName !== 0 && indexOfCityName !== -1) {
            const newValue = value.replace(value.slice(value.indexOf(upperCity),
                value.indexOf(upperCity) + upperCity.length), '_');
            const finalValue = upperCity.concat(' ', newValue);
            value = finalValue.split(' ').filter(element => element !== '_').join(' ');
        }
        dispatch({ type: 'SEARCHING_FOR_THE_CITY', cityValue: value, loading: true, show: false });
    };

    const press = event => {
        const { code } = event;
        if (readyToEnter && code === "Enter") {
            dispatch({ type: 'READY_TO_ENTER', payload: false });
            inputCtx.dispatch({ type: 'FORECAST_DETAILS', cityDetails: cityData });
        }
    }

    useEffect(() => {
        fecthingData(requestConfiguration.bind(null, process.env.REACT_APP_API_KEY), dispatch)
            (Array.from({ length: 3 }, () => ''), city, { type: 'COLLECTING_DATA', loading: true, show: true })
            .then(() => dispatch({ type: 'READY_TO_ENTER', payload: true }))
            .catch(({ message }) => message);
    }, [city])

    return (
        <Fragment>
            <input
                value={city}
                type="search"
                placeholder="City Name"
                list={suggestedCities}
                className={styles.SearchBar}
                onChange={searchingCity}
                onKeyDown={press} />
            {showUp &&
                <SuggestedCities
                    city={city}
                    suggestedCities={suggestedCities} />}
        </Fragment>
    );
}

export default Search;
