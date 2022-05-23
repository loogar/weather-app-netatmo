import React from 'react';
import { Flex, StackDivider, Stack } from '@chakra-ui/react';
import RainData from './RainData';
import WindData from './WindData';

const FooterStats = ({ windData, rainData }) => {
  return (
    <Flex
      h="full"
      w="full"
      boxShadow="2xl"
      p="4rem"
      color="white"
      backdropFilter=" blur(10px)"
    >
      <Stack
        direction={['column', 'column', 'row', 'row']}
        spacing={9}
        justifySelf="center"
        mx="auto"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <WindData windData={windData} />
        <RainData rainData={rainData} />
      </Stack>
    </Flex>
  );
};

export default FooterStats;
