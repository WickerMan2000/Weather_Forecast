import React, { Fragment, useContext, useEffect, useState } from 'react';
import { fecthingData, requestConfiguration } from './HelperFunctions/myHelperFunctions';
import InputContext from './store/InputContext';
import Forecast from './components/Forecast';
import Details from './components/Details';
import Search from './components/Search';
import Spinner from './UI/Spinner';

function App() {
  const { dispatch } = useContext(InputContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
          [city, country].join(', '),
          { type: 'FORECAST_DETAILS' }
        )
          .then(() => setIsLoading(false))
          .catch(({ message }) => message)
      );
  }, [dispatch])

  return (
    <Fragment>
      <Search />
      {!isLoading ? <div>
        <Details />
        <Forecast style={{
          marginTop: 60,
          marginLeft: 150,
          width: '80%'
        }} />
      </div> : <Spinner />}
    </Fragment>
  );
}

export default App;
