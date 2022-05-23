import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { LoadingProvider } from './context/LoadingContext';
import { ErrorProvider } from './context/ErrorContext';
import { ShowStatsProvider } from './context/ShowStatsContext';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#D6D6FF',
      },
    }),
  },
});

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <LoadingProvider>
        <ErrorProvider>
          <ShowStatsProvider>
            <App />
          </ShowStatsProvider>
        </ErrorProvider>
      </LoadingProvider>
    </ChakraProvider>
  </StrictMode>
);
