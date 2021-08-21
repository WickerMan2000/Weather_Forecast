const requestConfiguration = (apiKey, params) =>
    `https://api.openweathermap.org/data/2.5/forecast?q=${params.join(',')}&units=metric&appid=${apiKey}`;

const fecthingData = (requestConfig, dispatchFunction) => async (array, city, params) => {
    city.split(', ').forEach((word, index) => array.splice(index, 1, word));
    array.includes('') && ([array[array.length - 1], array[array.length - 2]] =
        [array[array.length - 2], array[array.length - 1]])
    const data = await (await fetch(requestConfig(array))).json();
    if (data.cod === "404") {
        console.log(data.message);
    }
    dispatchFunction({ ...params, ...{ cityDetails: data } });
}

export { fecthingData, requestConfiguration };