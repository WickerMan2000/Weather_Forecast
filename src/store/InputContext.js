import React from 'react';

const InputContext = React.createContext({
    cityWeatherDetails: {},
    dispatch: () => { }
})

export default InputContext;