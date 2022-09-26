import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './contexts/user';
import { Landing } from './pages';

function App() {
  return (
    <BrowserRouter basename="/ap-student">
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter >
  );
}

export default App;
