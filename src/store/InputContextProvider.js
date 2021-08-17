import React, { useReducer } from 'react';
import InputContext from './InputContext';

const { Provider } = InputContext;

const InputContextProvider = ({ children }) => {
    const [inputState, dispatchInput] = useReducer((state, action) => {
        if (action.type === 'FORECAST_DETAILS') {
            return {
                forecastDetails: action.cityDetails
            }
        }
        return state;
    }, {
        forecastDetails: {}
    });

    const inputContext = {
        cityWeatherDetails: inputState.forecastDetails,
        dispatch: dispatchInput
    }

    return <Provider value={inputContext}>
        {children}
    </Provider>
}

export default InputContextProvider;