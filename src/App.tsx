// import logo from './logo.svg';
import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import fun from './store';

import PodcastGrid from './components/PodcastGrid';

// import Parser from 'rss-parser';
import Player from './components/Player'
import './App.css'


function App() {
  const { store } = fun();
  return (
    <div className="container">
              <Helmet>
            <meta
              property="og:image"
              content={'/pods.png'}
            />
            <meta
              property="og:description"
              content={`A small podcast player`}
            />
            <meta name="image" content={'/android-chrome-192x192.png'} />
            
                <meta
      name="description"
      content="A small podcast player"
    />
    <meta property="og:title" content="500 Dash" />
    <meta
      name="twitter:title"
      content="Krc Podcasts — A small podcast player for web"
    />
          </Helmet>
      <Provider store={store}>
        <PodcastGrid />

        <Player />
      </Provider>
    </div>
  );
}

export default App;
