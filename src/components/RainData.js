import React from 'react';
import {
  Flex,
  Icon,
  Spacer,
  Text,
  VStack,
  StackDivider,
  Stack,
} from '@chakra-ui/react';
import { BsFillCloudLightningRainFill } from 'react-icons/bs';

const RainData = ({ rainData }) => {
  return (
    <Flex gridGap={2} direction="column">
      <Flex color="#00E2BF" direction="row">
        <Icon as={BsFillCloudLightningRainFill} />
        <Spacer />
        <Text>Rain</Text>
      </Flex>
      <Stack
        fontSize="0.8em"
        direction={['column', 'column', 'row', 'row']}
        spacing={5}
        divider={<StackDivider borderColor="gray.200" />}
        color="#00E2BF"
      >
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          <Text>
            Rain 60min :{' '}
            {rainData.rain_60min === null || ''
              ? 'N/A'
              : `${rainData.rain_60min} mm`}
          </Text>
          <Text>
            Rain 24h :{' '}
            {rainData.rain_24h === null || ''
              ? 'N/A'
              : `${rainData.rain_24h} mm`}
          </Text>
        </VStack>
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          <Text>
            Rain Live :{' '}
            {rainData.rain_live === null || ''
              ? 'N/A'
              : `${rainData.rain_live} mm`}
          </Text>
        </VStack>
      </Stack>
    </Flex>
  );
};

export default RainData;
