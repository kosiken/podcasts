// import logo from './logo.svg';
import React from 'react';
import { Provider } from 'react-redux';
import fun from './store';

import PodcastGrid from './components/PodcastGrid';

// import Parser from 'rss-parser';
import Player from './components/Player'
import './App.css'

const URL = "/p02nrsln.rss"

function App() {
  const { store } = fun();
  return (
    <div className="container">
      <Provider store={store}>
        <PodcastGrid />

        <Player />
      </Provider>
    </div>
  );
}

export default App;
