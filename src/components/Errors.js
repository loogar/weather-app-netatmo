import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Errors = ({ code }) => {
  // display errors based on error code
  switch (code) {
    case 1:
      return (
        <Flex
          mt="3rem"
          color="white"
          boxShadow="2xl"
          p="9"
          backdropFilter=" blur(4px)"
          direction="column"
        >
          <Text fontSize="3em">Invalid Request, </Text>
          <Text fontSize="1em"> Please, Try again later.</Text>
        </Flex>
      );
    case 2:
      return (
        <Flex
          mt="5rem"
          color="white"
          boxShadow="2xl"
          p="9"
          backdropFilter=" blur(4px)"
          direction="column"
        >
          <Text fontSize="3em">No, Data Found </Text>
          <Text fontSize="1em"> Please, Try again later.</Text>
        </Flex>
      );
    case 3:
      return (
        <Flex
          mt="5rem"
          color="white"
          boxShadow="2xl"
          p="9"
          backdropFilter=" blur(4px)"
          direction="column"
        >
          <Text fontSize="3em">Please, refresh your page.</Text>
        </Flex>
      );
    default:
      return (
        <Flex
          mt="5rem"
          color="white"
          boxShadow="2xl"
          p="9"
          backdropFilter=" blur(4px)"
          direction="column"
        >
          <Text fontSize="3em">Sorry, Something went wrong.</Text>
        </Flex>
      );
  }
};

export default Errors;
