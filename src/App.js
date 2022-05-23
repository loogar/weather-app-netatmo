import React from 'react';
import { Box } from '@chakra-ui/react';
import WeatherApp from './components/WeatherApp';

function App() {
  return (
    <Box
      h="70vh"
      m="auto"
      my="10vh"
      justifyContent="center"
      textAlign="center"
      w={['95vw', '95vw', '95vw', '70vw']}
      fontSize="xl"
      boxShadow="2xl"
    >
      <Box
        h="full"
        overflow="scroll"
        sx={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '&::-webkit-scrollbar-track': {
            display: 'none',
          },
          '&::-webkit-scrollbar-thumb': {
            display: 'none',
          },
        }}
        bgImage="url('/weather.jpg')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <WeatherApp />
      </Box>
    </Box>
  );
}

export default App;
