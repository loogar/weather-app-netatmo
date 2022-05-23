import React, { useState, useEffect } from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { BiTimeFive, BiCalendar } from 'react-icons/bi';

const Moment = () => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setDateState(new Date());
    }, 30000);
  }, []);

  return (
    <Flex color="#2F4858" gridGap={2} fontSize="0.8em" direction="row">
      <Icon w={6} h={6} as={BiCalendar} />

      <Text>
        {dateState.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </Text>
      <Icon w={6} h={6} as={BiTimeFive} />
      <Text>
        {dateState.toLocaleString('fr-FR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        })}
      </Text>
    </Flex>
  );
};

export default Moment;
