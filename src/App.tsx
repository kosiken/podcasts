// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios'
import axios from 'axios'
import { Podcast } from './cast';
import PodcastView from './components/PodcastView';
import Grid from '@material-ui/core/Grid';
import Parser from 'rss-parser';
import './App.css'

const URL = "/p02nrsln.rss"

function App() {
  let [loading, setLoad] = useState(true);
  let k: Podcast[] = [];
  let [podcasts, setPodcasts] = useState(k);

  const init = (): void => {
    (async () => {
      let ret: AxiosResponse<Podcast[]> = await axios.get("/casts.json");

    /*  setPodcasts(ret.data); let parser = new Parser();
      const b = /\/(https?)%/;

      let feed = await parser.parseURL(URL);

      console.log(feed.image);

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.enclosure?.url)
  });
*/
    })()
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
  <div>
    <Grid container style={{ width: '80%' }}>

      {podcasts.map((p, i) => (

        <Grid item lg={4} sm={6} xs={4} key={'podcast' + i} ><PodcastView podcast={p} />

        </Grid>))}

    </Grid>
     <audio controls autoPlay muted>

  <source src="aiffyep3.mp3" type="audio/mpeg" />
Your browser does not support the audio element.
</audio> 
    </div>
  );
}

export default App;
