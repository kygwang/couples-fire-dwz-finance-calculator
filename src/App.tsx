import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

function App() {
  // Add page transition effect
  useEffect(() => {
    document.body.classList.add('page-transition');
    return () => {
      document.body.classList.remove('page-transition');
    };
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Calculator />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;