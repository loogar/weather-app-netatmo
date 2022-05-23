import React from 'react';
import {
  Flex,
  Icon,
  Spacer,
  Text,
  Stack,
  VStack,
  StackDivider,
} from '@chakra-ui/react';
import { GiWhirlwind } from 'react-icons/gi';

const WindData = ({ windData }) => {
  return (
    <Flex gridGap={2} direction="column">
      <Flex color="#FFEACE" direction="row">
        <Icon as={GiWhirlwind} />
        <Spacer />
        <Text>Wind</Text>
      </Flex>
      <Stack
        fontSize="0.8em"
        direction={['column', 'column', 'row', 'row']}
        spacing={5}
        divider={<StackDivider borderColor="gray.200" />}
        color="#FFEACE"
      >
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          <Text>
            Wind strength :{' '}
            {windData.wind_strength === null || ''
              ? ' N/A'
              : `${windData.wind_strength} m/s`}
          </Text>
          <Text>
            wind angle :{' '}
            {windData.wind_angle === null || ''
              ? ' N/A'
              : `${windData.wind_angle}°`}
          </Text>
        </VStack>
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          <Text>
            Gust strength :{' '}
            {windData.gust_strength === null || ''
              ? ' N/A'
              : `${windData.gust_strength}mph`}
          </Text>
          <Text>
            Gust angle :{' '}
            {windData.gust_angle === null || ''
              ? ' N/A'
              : `${windData.gust_angle}°`}
          </Text>
        </VStack>
      </Stack>
    </Flex>
  );
};

export default WindData;
