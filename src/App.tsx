import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import CreatePool from './pages/CreatePool';
import IDOView from './pages/IDOView';
import BlockList from './pages/BlockList';
import Footer from './layouts/Footer';
import './styles/layouts/app.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<CreatePool />} />
            <Route path="/create" element={<CreatePool />} />
            <Route path="/pools" element={<IDOView />} />
            <Route path="/block" element={<BlockList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
