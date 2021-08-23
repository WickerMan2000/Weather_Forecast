import React, { Fragment, useContext, useEffect, useReducer, useRef } from 'react';
import { fecthingData, requestConfiguration } from '../HelperFunctions/myHelperFunctions';
import SuggestedCities from './SuggestedCities';
import InputContext from '../store/InputContext';
import styles from './Search.module.css';

const suggestedCities = "suggestedCities";

const setTimer = duration => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, [duration])
    })
}

const Search = () => {
    const [{ cityData, readyToEnter, showUp, city, getEntered }, dispatch] = useReducer((state, action) => {
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
                    readyToEnter: action.ready,
                    getEntered: action.entered
                }
            }
            case 'COLLECTING_DATA': {
                return {
                    ...state,
                    cityData: action.cityDetails,
                    showUp: action.show
                }
            }
            case 'GET_RID_OF_SUGGESTIONS': {
                return {
                    ...state,
                    showUp: action.show
                }
            }
            default:
                return state;
        }
    }, {
        cityData: {},
        readyToEnter: false,
        getEntered: false,
        showUp: false,
        city: ''
    });

    const inputCtx = useContext(InputContext);
    const cityRef = useRef('');

    const searchingCity = event => {
        const { value } = event.target;
        cityRef.current = value;
        dispatch({
            type: 'SEARCHING_FOR_THE_CITY',
            cityValue: value,
            show: false
        });
    };

    const press = event => {
        const { code } = event;
        if (readyToEnter && code === "Enter") {
            dispatch({
                type: 'READY_TO_ENTER',
                ready: false,
                entered: true
            });
            inputCtx.dispatch({
                type: 'FORECAST_DETAILS',
                cityDetails: cityData
            });
        } else {
            dispatch({
                type: 'READY_TO_ENTER',
                ready: false
            });
        }
    }

    useEffect(() => {
        (async () => {
            await setTimer(250);
            cityRef.current === city &&
                fecthingData(requestConfiguration.bind(null, process.env.REACT_APP_API_KEY), dispatch)
                    (Array.from({ length: 3 }, () => ''), cityRef.current, {
                        type: 'COLLECTING_DATA',
                        show: true
                    })
                    .then(() =>
                        dispatch({
                            type: 'READY_TO_ENTER',
                            ready: city ? true : false
                        }))
                    .catch(({ message }) =>
                        message
                    );
        })()
    }, [city])

    useEffect(() => {
        return () => dispatch({
            type: 'GET_RID_OF_SUGGESTIONS',
            show: false
        })
    }, [getEntered])

    return (
        <Fragment>
            <input
                value={city}
                ref={cityRef}
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
