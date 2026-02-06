import React from 'react';
import Timeline from '../components/Timeline/Timeline';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="left-line-vertical"></div>
      <h1 className="app-header">

        <div className="vertical-line"></div>
        <div className="header-text">
          <span className="header-title">Исторические</span>
          <span className="header-subtitle">даты</span>
        </div>
      </h1>

      <div className="center-line-horizontal"></div>
      <div className="center-line-vertical"></div>

      <div className="right-line-vertical"></div>
      <Timeline />
    </div>
  );
};

export default App;
