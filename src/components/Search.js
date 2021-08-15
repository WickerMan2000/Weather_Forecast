import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Search.module.css';
import SuggestedCities from './SuggestedCities';

const setTimer = duration => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}

const Search = () => {
    const [cityData, setCityData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [readyToEnter, setReadyToEnter] = useState(false);
    const [showUp, setShowUp] = useState(false);
    const [city, setCity] = useState('');
    const cityRef = useRef('');

    const searchingCity = event => {
        const { value } = event.target;
        cityRef.current = value;
        setCity(value);
        setIsLoading(true);
    };

    const press = event => {
        const { code } = event;
        if (readyToEnter && code === "Enter") {
            console.log(cityData);
            setReadyToEnter(false);
        }
    }

    const getSuggestedCity = suggestedCity => {
        cityRef.current = suggestedCity;
        setCity(suggestedCity);
        setShowUp(false);
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
                    `q=${newArray[0]},${newArray[1]},${newArray[2]}&appid=3aaac1f503cd848c0e19620ef3ece574`)
            ).json();
            if (data.cod === "404") {
                console.log('Error');
            }
            setIsLoading(false);
            setCityData(data);
            setShowUp(true);
        }
    }, [city])

    useEffect(() => {
        collectData().then(() => setReadyToEnter(true));
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