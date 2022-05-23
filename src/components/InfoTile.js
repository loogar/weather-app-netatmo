import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react';

const InfoTile = ({ value, icon, heading }) => {
  return (
    <Flex
      boxShadow="2xl"
      h="10rem"
      p="9"
      color="#FFF7ED"
      backdropFilter=" blur(4px)"
      direction="column"
    >
      <Icon as={icon} />

      <Text fontWeight="bold" fontSize="2.5em">
        {value}
      </Text>
      <Text fontSize="0.6em">{heading}</Text>
    </Flex>
  );
};

export default InfoTile;
