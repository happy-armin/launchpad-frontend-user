import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import IDOView from './pages/IDOView';
import Footer from './layouts/Footer';
import IDODetail from './pages/IDODetail';
import NotFound from './pages/NotFound';

import './styles/layouts/app.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<IDOView />} />
            <Route path="/pools" element={<IDOView />} />
            <Route path="/pools/:poolId" element={<IDODetail />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
