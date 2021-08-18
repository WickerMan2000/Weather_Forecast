import React, { Fragment, useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import { fecthingData, requestConfiguration } from '../HelperFunctions/myHelperFunctions';
import SuggestedCities from './SuggestedCities';
import InputContext from '../store/InputContext';
import styles from './Search.module.css';

const setTimer = duration => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}

const Search = () => {
    const [{ cityData, isLoading, readyToEnter, showUp, city }, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SEARCHING_FOR_THE_CITY': {
                return {
                    ...state,
                    city: action.cityValue,
                    isLoading: action.loading,
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
                    isLoading: action.loading,
                    cityData: action.cityDetails,
                    showUp: action.show
                }
            }
            default:
                return state;
        }
    }, {
        cityData: {},
        isLoading: false,
        readyToEnter: false,
        showUp: false,
        city: '',
    });

    const inputCtx = useContext(InputContext);
    const cityRef = useRef('');

    const searchingCity = event => {
        const { value } = event.target;
        cityRef.current = value;
        dispatch({ type: 'SEARCHING_FOR_THE_CITY', cityValue: value, loading: true, show: false });
    };

    const press = event => {
        const { code } = event;
        if (readyToEnter && code === "Enter") {
            dispatch({ type: 'READY_TO_ENTER', payload: false });
            inputCtx.dispatch({ type: 'FORECAST_DETAILS', cityDetails: cityData });
        }
    }

    const getSuggestedCity = suggestedCity => {
        cityRef.current = suggestedCity;
        dispatch({ type: 'GET_SUGGESTED_CITY', cityValue: suggestedCity, show: false })
    }

    const collectData = useCallback(async () => {
        await setTimer(500);
        if (cityRef.current === city) {
            fecthingData(requestConfiguration.bind(null, process.env.REACT_APP_API_KEY), dispatch)
                (Array.from({ length: 3 }, () => ''), cityRef.current, { type: 'COLLECTING_DATA', loading: true, show: true })
        }
    }, [city])

    useEffect(() => {
        collectData()
            .then(() => dispatch({ type: 'READY_TO_ENTER', payload: true }))
            .catch(({ message }) => message);
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