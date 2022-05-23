import React from 'react';
import { Flex } from '@chakra-ui/react';
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { BsSpeedometer2 } from 'react-icons/bs';

import InfoTile from './InfoTile';

const TemperatureData = ({ weatherData }) => {
  return (
    <Flex
      mt={6}
      justify="center"
      gridGap={5}
      direction={['column', 'column', 'row', 'row']}
    >
      <InfoTile
        value={`${weatherData.temperatureData.temperature}°C`}
        icon={FaTemperatureHigh}
        heading="Temperature"
      />
      <InfoTile
        value={`${weatherData.temperatureData.humidity}%`}
        icon={WiHumidity}
        heading="Humidity"
      />
      <InfoTile
        value={`${weatherData.pressure}PA`}
        icon={BsSpeedometer2}
        heading="Pressure"
      />
    </Flex>
  );
};

export default TemperatureData;
