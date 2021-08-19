import React, { useContext, useEffect } from 'react';
import { fecthingData, requestConfiguration } from './HelperFunctions/myHelperFunctions';
import InputContext from './store/InputContext';
import Forecast from './components/Forecast';
import Details from './components/Details';
import Search from './components/Search';

function App() {
  const { dispatch } = useContext(InputContext);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response =>
        response.json()
      )
      .then(({ city, country }) =>
        fecthingData(
          requestConfiguration.bind(null, process.env.REACT_APP_API_KEY),
          dispatch
        )(
          Array.from({ length: 3 }, () => ''),
          [city, country].join(' '),
          { type: 'FORECAST_DETAILS' }
        )
          .catch(({ message }) => message)
      );
  }, [])

  return (
    <div>
      <Search />
      <Details />
      <Forecast style={{
        marginTop: 400,
        marginLeft: 150,
        width: '80%'
      }} />
    </div>
  );
}

export default App;
