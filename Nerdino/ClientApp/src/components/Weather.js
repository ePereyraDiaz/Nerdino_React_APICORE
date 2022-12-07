import React from 'react';
import { useQuery } from 'react-query';

import { api } from '../utilities/api'

function ForecastsTable({ forecasts }) {
    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Min/Max Temp. (C)</th>
                    <th>Min/Max Temp. (F)</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.dayOfWeek}</td>
                        <td>{forecast.date.substring(0, 10)}</td>
                        <td>{forecast.minTemperatureC}/{forecast.maxTemperatureC}</td>
                        <td>{forecast.minTemperatureF}/{forecast.maxTemperatureF}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

function Weather() {
    const { isLoading, isError, isSuccess, data } = useQuery("weatherForecast", async () => {
        return api.get("weatherforecast");
    });

    return (
        <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <>
                {isLoading && <p><em>Loading...</em></p>}
                {isError && <p><em>Unable to retrieve data. Try again later.</em></p>}
                {isSuccess && <ForecastsTable forecasts={data} />}
            </>
        </div>
    );
}

export default Weather;
