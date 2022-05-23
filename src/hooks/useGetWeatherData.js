import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { CITIES } from '../Constants';
import { useGetAccessToken } from './useGetAccessToken';
import { useLoading } from '../context/LoadingContext';
import { useErrorCode } from '../context/ErrorContext';
import { useShowStats } from '../context/ShowStatsContext';

export const useGetWeatherData = () => {
  const { setLoading } = useLoading();
  const { setErrorCode } = useErrorCode();
  const { setShowStats } = useShowStats();

  const [weatherData, setWeatherData] = useState({
    city: '',
    temperatureData: {},
    pressure: '',
    rainData: {},
    windData: {},
  });

  const [tabIndex, setTabIndex] = useState(0);

  const { accessToken } = useGetAccessToken();

  // fetch weatherdata everytime we change tab
  const fetchWeatherData = useCallback(
    async index => {
      // set error,loading, tab index, show stats
      setErrorCode(0);
      setLoading(true);
      setShowStats(false);
      setTabIndex(index);
      const city = CITIES[index];

      let weatherData;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await axios
        .get(
          `https://api.netatmo.com/api/getpublicdata?lat_ne=${city.lat_ne}&lon_ne=${city.lon_ne}&lat_sw=${city.lat_sw}&lon_sw=${city.lon_sw}&required_data=wind`,
          config
        )
        .then(res => {
          weatherData = res;
        })
        .catch(() => {
          setErrorCode(1);
          setShowStats(false);
        });

      if (weatherData === undefined) {
        // display error if the the response is undefined

        setErrorCode(1);
        setLoading(false);
        setShowStats(false);
      } else {
        // display error if the the response is empty
        if (weatherData.data.body.length <= 0) {
          setErrorCode(2);
          setShowStats(false);
          setLoading(false);
        } else {
          const mac_address_NAMain = weatherData.data.body[0]['_id'];
          let NAModules = {
            mac_address_NAModule1: '',
            mac_address_NAModule2: '',
            mac_address_NAModule3: '',
          };

          const module_types = weatherData.data.body[0].module_types;

          // get measure keys to get values
          for (const mac_address_NAModule in module_types) {
            const mac_address_NAModule_str = mac_address_NAModule.toString();
            if (module_types[mac_address_NAModule_str] === 'NAModule1')
              NAModules.mac_address_NAModule1 = mac_address_NAModule_str;
            if (module_types[mac_address_NAModule_str] === 'NAModule2')
              NAModules.mac_address_NAModule2 = mac_address_NAModule_str;
            if (module_types[mac_address_NAModule_str] === 'NAModule3')
              NAModules.mac_address_NAModule3 = mac_address_NAModule_str;
          }

          // pressure Data
          let time_stamp_pressure;
          const res_pressure =
            weatherData.data.body[0].measures[mac_address_NAMain.toString()]
              .res;
          for (const prop in res_pressure) {
            time_stamp_pressure = prop;
            break;
          }
          const pressure =
            weatherData.data.body[0].measures[mac_address_NAMain.toString()]
              .res[time_stamp_pressure.toString()][0];

          // get Rain Data
          const rainData = {
            rain_60min: '',
            rain_24h: '',
            rain_live: '',
            rain_timeutc: '',
          };

          if (NAModules.mac_address_NAModule3 !== '') {
            const rain_60min =
              weatherData.data.body[0].measures[
                NAModules.mac_address_NAModule3
              ]['rain_60min'];
            const rain_24h =
              weatherData.data.body[0].measures[
                NAModules.mac_address_NAModule3
              ]['rain_24h'];
            const rain_live =
              weatherData.data.body[0].measures[
                NAModules.mac_address_NAModule3
              ]['rain_live'];
            const rain_timeutc =
              weatherData.data.body[0].measures[
                NAModules.mac_address_NAModule3
              ]['rain_timeutc'];

            rain_60min == null
              ? (rainData.rain_60min = '')
              : (rainData.rain_60min = rain_60min.toFixed(1));
            rain_24h == null
              ? (rainData.rain_24h = '')
              : (rainData.rain_24h = rain_24h.toFixed(1));
            rain_live == null
              ? (rainData.rain_live = '')
              : (rainData.rain_live = rain_live.toFixed(1));
            rain_timeutc == null
              ? (rainData.rain_timeutc = '')
              : (rainData.rain_timeutc = rain_timeutc);
          }

          // get wind Data

          const windData = {
            wind_strength: '',
            wind_angle: '',
            gust_strength: '',
            gust_angle: '',
            wind_timeutc: '',
          };

          if (NAModules.mac_address_NAModule2 !== '') {
            const wind_strength =
              weatherData.data.body[0].measures[
                NAModules.mac_address_NAModule2
              ]['wind_strength'];
            const wind_angle =
              weatherData.data.body[0].measures[
                NAModules.mac_address_NAModule2
              ]['wind_angle'];
            const gust_strength =
              weatherData.data.body[0].measures[
                NAModules.mac_address_NAModule2
              ]['gust_strength'];
            const gust_angle =
              weatherData.data.body[0].measures[
                NAModules.mac_address_NAModule2
              ]['gust_angle'];
            const wind_timeutc =
              weatherData.data.body[0].measures[
                NAModules.mac_address_NAModule2
              ]['wind_timeutc'];

            windData.wind_strength = wind_strength;
            windData.wind_angle = wind_angle;
            windData.gust_strength = gust_strength;
            windData.gust_angle = gust_angle;
            windData.wind_timeutc = wind_timeutc;
          }

          // Get Temperature Data
          const temperature_response =
            weatherData.data.body[0].measures[NAModules.mac_address_NAModule1]
              .res;
          let time_stamp_temperature_humidity;
          for (const prop in temperature_response) {
            time_stamp_temperature_humidity = prop;
            break;
          }
          const temperature =
            weatherData.data.body[0].measures[NAModules.mac_address_NAModule1]
              .res[time_stamp_temperature_humidity.toString()][0];
          const humidity =
            weatherData.data.body[0].measures[NAModules.mac_address_NAModule1]
              .res[time_stamp_temperature_humidity.toString()][1];

          const temperatureData = {
            temperature: temperature,
            humidity: humidity,
          };

          // if everything is write get
          setShowStats(true);
          setErrorCode(0);
          setWeatherData({
            city: city.city,
            temperatureData: temperatureData,
            rainData: rainData,
            windData: windData,
            pressure: pressure,
          });
          setLoading(false);
        }
      }
    },
    [accessToken, setErrorCode, setLoading, setShowStats]
  );

  useEffect(() => {
    if (accessToken !== '') {
      // run initial data to fetch for default selection
      fetchWeatherData(0);
    }
  }, [fetchWeatherData, accessToken]);

  return { weatherData, fetchWeatherData, tabIndex };
};
