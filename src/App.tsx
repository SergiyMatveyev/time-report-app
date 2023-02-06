import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TimeReportProvider } from './context/TimeReport/provider';
import { Middleware } from './middleware/auth';
import { AppRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Middleware>
        <TimeReportProvider>
          <AppRoutes />
        </TimeReportProvider>
      </Middleware>
    </BrowserRouter>
  );
}

export default App;
