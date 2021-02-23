import React from 'react';
import Parser from 'rss-parser';
import { Podcast } from '../cast';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Slider from '@material-ui/core/Slider';

type PlayerProps = {
    podcast?: Podcast;
    key?: string | number;
    children?: React.ReactNode;
    color?: string;
    backgroundColor?: string;
}


const DefaultPodCast: Podcast = {

      rss:                      "None",
    description_highlighted:  "None",
    description_original:     "None",
    title_highlighted:        "None",
    title_original:           "None",
    publisher_highlighted:    "None",
    publisher_original:       "None",
 
    thumbnail:                "None",
    itunes_id:                2,
    latest_pub_date_ms:       2,
    earliest_pub_date_ms:     4,
    id:                       "None",
    genre_ids:                [99,6],
    listennotes_url:          "None",
    total_episodes:           0,
    email:                    "None",
    explicit_content:         false,
    website:                  "None",
    listen_score:             "None",
    listen_score_global_rank: "None",
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default const Player: React.FunctionComponent<PodcastViewProps> =({backgroundColor, color, podcast = DefaultPodCast}) => {
  const classes = useStyles();
  
  
return ( <div> <Card className={classes.root}>
   <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {podcast
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>
  </Card>
  </div>
  );
  
}





