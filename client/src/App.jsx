import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoute from './configs/router';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        {AppRoute.map((route, index) => {
          const Layout = route.layout || React.Fragment; 
          const Page = route.page;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;