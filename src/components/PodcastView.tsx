import React, { useEffect, useState } from 'react';
import getImagePalette from "image-palette-core";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';

 
import Typography from '@material-ui/core/Typography';
import { Podcast } from '../cast';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import {   Action } from "../store"

import { Dispatch } from 'redux';

type PodcastViewProps = {
  podcast: Podcast;
  key?: string | number;
  children?: React.ReactNode;
  onClick?: (podcast: Podcast, color: string,
    backgroundColor: string) => void;
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 'max-width': 300,

    margin: 20,
    'flex-direction': 'column',
    '-ms-flex-align': 'center',
    'align-items': 'center', padding: '10px 0', cursor: 'pointer',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }, cover: {
    maxWidth: 200, maxHeight: 200,
    width: "90%"
  },
  playIcon: {
    height: 38,
    width: 38,
  }
}));

const PodcastView: React.FunctionComponent<PodcastViewProps> = ({ podcast, key, onClick = () => { } }) => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<Action>>()
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [color, setColor] = useState("#000000");
//  const [altColor, setAltColor] = useState("#cccccc");
  useEffect(() => {
    const image = new Image();
    if (podcast.image) {
      image.crossOrigin = "Anonymous"
//      console.log("lll")
      image.src = podcast.image;
      image.onload = () => {
        let colors = getImagePalette(image);
        setBackgroundColor(colors.backgroundColor);
        setColor(colors.color);
       // setAltColor(colors.alternativeColor);
      }
    }

  }, [podcast.image]);

  return (
    <Card className={classes.root} style={{ backgroundColor, color }} onClick={() => {
      dispatch({ type: "theme", backgroundColor, color })
      dispatch({ type: "select", podcast })
    }}>
      <img className={classes.cover} src={podcast.image} alt={podcast.title_original} />
      <CardContent>
        <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {podcast.publisher_original}

        </Typography>

      </CardContent>
    </Card>
  )



}

export default PodcastView;
