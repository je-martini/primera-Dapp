import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider>
      <App />
      </ChakraProvider>
    </HashRouter>
    
  </React.StrictMode>,
  document.getElementById("root")
);
