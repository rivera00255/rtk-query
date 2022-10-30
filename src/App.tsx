import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Album from './pages/Album';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/album" element={<Album />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
