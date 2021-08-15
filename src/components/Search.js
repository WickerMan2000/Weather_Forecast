import React, { Fragment, useCallback, useEffect, useReducer, useRef } from 'react';
import SuggestedCities from './SuggestedCities';
import styles from './Search.module.css';

const initialState = {
    cityData: {},
    isLoading: false,
    readyToEnter: false,
    showUp: false,
    city: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCHING_FOR_THE_CITY': {
            return {
                ...state,
                city: action.payload.cityValue,
                isLoading: action.payload.loading
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
                city: action.payload.cityValue,
                showUp: action.payload.show
            }
        }
        case 'COLLECTING_DATA': {
            return {
                ...state,
                isLoading: action.payload.loading,
                cityData: action.payload.cityDetails,
                showUp: action.payload.show
            }
        }
        default:
            return state;
    }
}

const setTimer = duration => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}

const Search = () => {
    const [{ cityData, isLoading, readyToEnter, showUp, city }, dispatch] = useReducer(reducer, initialState);
    const cityRef = useRef('');

    const searchingCity = event => {
        const { value } = event.target;
        cityRef.current = value;
        dispatch({ type: 'SEARCHING_FOR_THE_CITY', payload: { cityValue: value, loading: true } });
    };

    const press = event => {
        const { code } = event;
        if (readyToEnter && code === "Enter") {
            console.log(cityData);
            dispatch({ type: 'READY_TO_ENTER', payload: false });
        }
    }

    const getSuggestedCity = suggestedCity => {
        cityRef.current = suggestedCity;
        dispatch({ type: 'GET_SUGGESTED_CITY', payload: { cityValue: suggestedCity, show: false } })
    }

    const collectData = useCallback(async () => {
        await setTimer(500);
        if (cityRef.current === city) {
            const newArray = Array.from({ length: 3 }, () => '');
            cityRef.current.split(' ').forEach((word, index) => newArray.splice(index, 1, word));
            newArray.includes('') && ([newArray[newArray.length - 1], newArray[newArray.length - 2]] =
                [newArray[newArray.length - 2], newArray[newArray.length - 1]])
            const data = await (
                await fetch(`https://api.openweathermap.org/data/2.5/forecast?` +
                    `q=${newArray[0]},${newArray[1]},${newArray[2]}&appid=${process.env.REACT_APP_API_KEY}`)
            ).json();
            if (data.cod === "404") {
                console.log('Error');
            }
            dispatch({ type: 'COLLECTING_DATA', payload: { loading: true, cityDetails: data, show: true } });
        }
    }, [city])

    useEffect(() => {
        collectData().then(() => dispatch({ type: 'READY_TO_ENTER', payload: true }));
    }, [collectData])

    return (
        <Fragment>
            <input
                ref={cityRef}
                value={city}
                type="search"
                placeholder="City Name"
                className={styles.SearchBar}
                onChange={searchingCity}
                onKeyDown={press} />
            {showUp &&
                <SuggestedCities
                    city={city}
                    suggestedCity={getSuggestedCity} />}
        </Fragment>
    );
}

export default Search;