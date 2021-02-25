import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useHover from '@react-hook/hover';
import { PlayerAudio } from '../cast';
import { setTitle, durationToStr } from '../utils';


type EpisodeProps = {
  episode: PlayerAudio;
  key?: string | number; color: string;
  backgroundColor: string;
  index: number;

 children?: React.ReactNode;
  onClick?: (episode: PlayerAudio, index: number) => void;
}


const useStyles = makeStyles((theme) => ({


  episode: {
    display: 'flex',
    
    
    
    alignItems: 'center',
    margin: '2px 0 10px',
    padding: '2px 5px', 'justify-content': 'center', cursor: 'pointer'
  }

}));


const Episode: React.FunctionComponent<EpisodeProps> = ({ episode: p, color, index, backgroundColor, onClick = () => { } }) => {
 const classes = useStyles();
  const target = React.useRef<HTMLDivElement>(null);
  const isHovering = useHover(target)
  return (<div ref={target} className={classes.episode} style={{
    color: isHovering ? backgroundColor : color,
    backgroundColor: isHovering ? color : backgroundColor
  }} onClick={() => {
    onClick(p, index);
  }}>
    <Typography component="span" style={{ flex: 1 }}>
      {p.episode}
    </Typography>

    <Typography style={{ flex: 8 }}>
      {setTitle(p.title, 35)}
    </Typography>
    <Typography component="span" variant="caption" style={{ flex: 1 }}>
      {durationToStr(p.duration)}
    </Typography>

  </div>
  )

}


export default Episode
