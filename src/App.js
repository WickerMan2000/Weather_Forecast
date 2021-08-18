import React, { useContext, useEffect } from 'react';
import Details from './components/Details';
import Search from './components/Search';
import useFetchedData from './CustomHooks/useFetchedData';
import InputContext from './store/InputContext';

const requestConfiguration = (apiKey, params) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${params.join(',')}&appid=${apiKey}`;

function App() {
  const { searchedCity } = useFetchedData();
  const { dispatch } = useContext(InputContext);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response =>
        response.json()
      )
      .then(data =>
        searchedCity(
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
