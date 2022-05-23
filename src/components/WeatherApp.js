import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Flex,
  TabPanel,
  Text,
  Spacer,
} from '@chakra-ui/react';

import { useGetWeatherData } from '../hooks/useGetWeatherData';
import WeatherStats from './WeatherStats';
import Moment from './Moment';

const WeatherApp = () => {
  const { weatherData, fetchWeatherData, tabIndex } = useGetWeatherData();

  return (
    <Tabs variant="soft-rounded" index={tabIndex} onChange={fetchWeatherData}>
      <Flex
        gridGap={2}
        p="2"
        align="center"
        direction={['column', 'column', 'row', 'row']}
      >
        <Flex gridGap={2} direction="column">
          <Text fontWeight="bold" fontSize="1em" color="#2F4858">
            Netatmo Weather widget
          </Text>
          <Moment />
        </Flex>
        <Spacer />
        <TabList color="#2F4858" justifyContent="flex-end">
          <Tab>Paris</Tab>
          <Tab>New york</Tab>
          <Tab>Berlin</Tab>
          <Tab>Bogota</Tab>
        </TabList>
      </Flex>
      <TabPanels>
        <TabPanel>
          <WeatherStats weatherData={weatherData} />
        </TabPanel>
        <TabPanel>
          <WeatherStats weatherData={weatherData} />
        </TabPanel>
        <TabPanel>
          <WeatherStats weatherData={weatherData} />
        </TabPanel>
        <TabPanel>
          <WeatherStats weatherData={weatherData} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default WeatherApp;
