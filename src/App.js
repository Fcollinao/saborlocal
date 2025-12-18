import React from 'react';
import { AppProvider } from './context/AppContext';
import AppRoutes from './app/routes';
import './index.css';

function App() {
  return (
    <AppProvider>
      <div className="app-root">
        <main className="app-content">
          <AppRoutes />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
