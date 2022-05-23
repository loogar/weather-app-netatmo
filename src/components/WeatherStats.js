import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

import { useErrorCode } from '../context/ErrorContext';
import { useLoading } from '../context/LoadingContext';
import { useShowStats } from '../context/ShowStatsContext';
import Errors from './Errors';
import FooterStats from './FooterStats';
import TemperatureData from './TemperatureData';

const WeatherStats = ({ weatherData }) => {
  const { errorCode } = useErrorCode();
  const { showStats } = useShowStats();
  const { loading } = useLoading();

  return (
    <>
      {errorCode !== 0 && <Errors code={errorCode} />}
      {loading && <Spinner mt="5rem" color="white" size="lg" />}
      {showStats && (
        <Flex my="5" direction="column">
          {/* just temperature humidity and pressure*/}
          <TemperatureData weatherData={weatherData} />
          <Flex>
            {/* just rain and wind*/}
            <FooterStats
              rainData={weatherData.rainData}
              windData={weatherData.windData}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default WeatherStats;
