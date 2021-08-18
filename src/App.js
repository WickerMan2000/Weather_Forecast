import React, { useContext, useEffect } from 'react';
import { fecthingData, requestConfiguration } from './HelperFunctions/myHelperFunctions';
import InputContext from './store/InputContext';
import Details from './components/Details';
import Search from './components/Search';

function App() {
  const { dispatch } = useContext(InputContext);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response =>
        response.json()
      )
      .then(data =>
        fecthingData(
          requestConfiguration.bind(null, process.env.REACT_APP_API_KEY),
          dispatch
        )(
          Array.from({ length: 3 }, () => ''),
          [data.city, data.country].join(' '),
          { type: 'FORECAST_DETAILS' }
        )
          .catch(({ message }) => message)
      );
  }, [])

  return (
    <div>
      <Search />
      <Details />
    </div>
  );
}

export default App;
