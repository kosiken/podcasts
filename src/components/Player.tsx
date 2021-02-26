import React from 'react';

import { Podcast,PlayerAudio } from '../cast';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import {
  MdArrowBack as Back, MdPause as PauseIcon, MdSkipNext as SkipNextIcon, MdSkipPrevious as SkipPreviousIcon, MdPlayArrow as PlayArrowIcon
} from 'react-icons/md';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
 import Backdrop from '@material-ui/core/Backdrop';
import Episode from './Episode';
import useDebounce from '../useDebounce'
import {PodcastsApiInstance} from '../api';import { setTitle, durationToStr } from '../utils';
import { useSelector, useDispatch   } from 'react-redux';
import { Dispatch } from 'redux';
import {AppState, Action, State} from "../store"
   
type PlayerProps = {
  podcast?: Podcast;
  key?: string | number;
  children?: React.ReactNode;
 }


const useStyles = makeStyles((theme) => ({
  main: {
    'min-width': 300,
    "height": "100vh",
 'max-width': 500,
    padding: '0 8px 8px',
    margin: '0 2px 2px 0',
    'box-shadow':
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
       display: 'flex', 
       flexDirection:"column",
width:"30%"

  },
    indicator: {
    width: '100vw',
    position: 'fixed',
    top: 0,
    zIndex: 999, left: 0,


  },
  
  root: {
    display: 'flex', 'box-shadow': 'none', padding: 5,
    'justify-content': 'space-between', width: "100%"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  acb: {
    display: 'block',
    padding: 0
  },
  acc: {
    boxShadow: 'none',
    background: 'none',
    padding: 0,
    '&::before': { background: 'none',}
  },
  cover: {
    width: 90,height:90
    
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1), 'justify-content': 'center'
  },
  playIcon: {
    height: 38,
    width: 38,
  },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
   
    },
  episode: {
    display: 'flex',
    alignItems: 'center',
    margin: '2px 0 10px',
    padding: '2px 5px', 'justify-content': 'center', cursor: 'pointer'
  }

}));




/*
    const Episodes:PlayerAudio[] = [
    {
    src: "aiffyep2.mp3",
    typ: "audio/mpeg",
    title: "How to Stop Being Judgemental - Episode 3",
    duration: 352,
    episode:3
    },

    {
    src: "aiffyep2.mp3",
    typ: "audio/mpeg",
    title: "How to Stop Being Judgemental - Episode 3",
    duration: 352,
    episode:3
    },
    {
    src: "aiffyep2.mp3",
    typ: "audio/mpeg",
    title: "How to Stop Being Judgemental - Episode 3",
    duration: 352,
    episode:3
    }
    ]

*/

const Player: React.FunctionComponent<PlayerProps> = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
   const dispatch = useDispatch<Dispatch<Action>>()
 const {backgroundColor, color, podcast, page} = useSelector<AppState, State>((state)=> {
   return state.app
 })
const [open, setOpen] = React.useState(false);
  const [isPlaying, setPlaying] = React.useState(false);
  const [shouldPlay, isSetting] = useDebounce(isPlaying,200)
  const [mIndex, setIndex] = React.useState(0);
  const [value, setValue] = React.useState(0);
  let [playlist, setPlaylist] = React.useState<PlayerAudio[]>([]);
  const [elapsed, setElapsed] = React.useState(0);
  let [play, setPlay] = React.useState<PlayerAudio>();
  const ref = React.useRef<HTMLAudioElement>(null);
  const [mError, setMError] = React.useState("");


 
  const init = (): void => {
    (async () => {
      setElapsed(0);
      setPlaylist([])
      setPlay(undefined);
      let r = ref.current;
      setExpanded(false);
      setPlaying(false);
      setMError("")
 
      if (r) {
        r.pause()
        r.currentTime = 0
      }
      if(podcast === undefined) return;
      if (podcast.image) {
        try {
         
          let n: PlayerAudio[];
          n = await PodcastsApiInstance.getAudio(podcast.rss);
         setPlaylist(n);
          setExpanded(true);

        }
        catch (err) {
        console.log(err)
          setMError("Error loading podcast")
        }
      }

    })()
  }

  React.useEffect(() => {
    if (!play) return;
    let r = ref.current;
    if (r == null) return;
    if (isPlaying) {
      if (r.readyState >= 2) {
        r.play()
      }


    }
    if (!isPlaying) r.pause();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  React.useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcast])
  
  React.useEffect(() => {
    if (play) {
   //  alert("here")
      let r = ref.current
      if (r) {
        r.pause();
      setOpen(true)
        
        r.src = play.src;
        r.addEventListener("timeupdate", () => {
          let e = (Math.floor(r?.currentTime || 0))
            
          setElapsed(e)
          if (play) setValue((e / play.duration) * 100)
          
        });
        r.play()
         setPlaying(true)
        r.addEventListener("loadeddata", () => {
       //  alert("loaded")
          if (r && (r.readyState >= 2)) {
         
        //  r.play();  
        setOpen(false)
          setPlaying(true)
          }
        });
      }
      
    }
  }, [play])
  React.useEffect(() => {
    if (!playlist.length) return;
    let audio = playlist[mIndex];
    if (audio.episode !== play?.episode) {
    setValue(0)
      let r = ref.current
      if (r) r.currentTime = 0;
      
    setPlay(audio)}

// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mIndex])
  
  
  React.useEffect(() => {
console.log("88")

  }, [backgroundColor])
  
  const renderPod = () => {
      if (podcast) return (
       <React.Fragment>  
  
          <Accordion className={classes.acc}>

        <AccordionSummary

          className={classes.acb}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Card className={classes.root} style={{ backgroundColor, color }} >
            <div className={classes.details}> <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
                {setTitle(podcast.publisher_original, 25)}
              </Typography>
              <Typography variant="subtitle1">
                {setTitle(podcast.title_original, 35)}
              </Typography>
            </CardContent>
            </div>

             <CardMedia
              className={classes.cover}
              image={podcast.image}
              title={podcast.title_original}
            />
          </Card>
        </AccordionSummary>
        <AccordionDetails style={{ display: 'block', maxHeight: '300px' }}>
         <Typography component="span" style={{ flex: 1 }}>
   {podcast.description_original}
    </Typography>
        </AccordionDetails>
      </Accordion> 
      
   <div style={{height:"70%", overflowY:playlist.length > 5 ? "scroll" : "hidden"}}>
   { playlist.map((p, i) => { return (<Episode episode={p} key={'episode' + i} 
 backgroundColor={backgroundColor}
                color={color} index={i} onClick={(audio, index) => {

                  setIndex(index);
                  setPlay(audio);
                }} />)
   })
                
                }
                <div style={{textAlign: 'center'}} >
                
                {!expanded && (<CircularProgress color="inherit"  />) }
                </div>
</div>
</ React.Fragment>
    )
    return <div />
  
  }
  return (
    <div className={"main " + (page === "player" ? "" : "none") } style={{ backgroundColor, color }}>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
       <Helmet>
         <title>{play?.title || podcast?.title_original || "Podcasts" } </title>
       </Helmet>
  
    <div id="back">
    <IconButton style={{ color}}  onClick={()=> {
       dispatch({ type: "close"})
    
    
    }} > <Back/> </IconButton>
    </div >
    <div style={{height:"65%"}}>
{renderPod()}
      </div>
       <div style={{ position: 'absolute', bottom: 0, left: 0, width: '98%',
padding: '10px 5px' }}>  <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>
        {setTitle(play?.title || "No episode", 35)}
      </Typography>
      {!!mError.length && (<Typography style={{ textAlign: 'center' }} variant="subtitle1">{mError}</Typography>)}
   <div className={classes.controls} style={{ color }}>

        <IconButton style={{ color }}  disabled={!playlist.length} onClick={() => {
          if (mIndex > 0) setIndex(mIndex - 1);
        }}>
          <SkipPreviousIcon />

        </IconButton>
        <IconButton style={{ color }} disabled={play?.src ? false : true} onClick={()=> {
          if(!ref.current||isSetting) return;
            
          let r = ref.current;if(r.readyState <2) return;
          setPlaying(!shouldPlay)
          if(shouldPlay) {
           r.pause()

          }
          else {
         
              if (r && (r.readyState >= 2))r.play()
          }
        }}>

          {shouldPlay ? (<PauseIcon className={classes.playIcon} />) :
            (<PlayArrowIcon className={classes.playIcon} />)}
        </IconButton>

        <IconButton style={{ color }} disabled={!playlist.length} onClick={() => {
          let len = playlist.length;
          if (!len) return;
          if ((len > (mIndex + 1))) {
            setIndex(mIndex + 1);
          }
          else setIndex(0);

        }}>
          <SkipNextIcon />
        </IconButton>


      </div> 
         <audio ref={ref}>
Audio not suporteed
      </audio>   <Grid container spacing={2} style={{
        alignItems: 'center'
      }}>


        <Grid item>
          <span>{durationToStr(elapsed)}</span>
        </Grid>
        <Grid item xs>
          <Slider value={value} style={{ color }} disabled={play?.src ? false : true} onChange={(event, newValue) => {
            let r = ref.current;
            let num = Number(newValue)
            if (r && play) {
              r.pause()
              let n = (Math.round((num / 100) * play.duration))
              r.currentTime = n;
              if(shouldPlay){
              
              
              if (r && (r.readyState >= 2))r.play()
              
              }
            }
            setValue(num);
          }} />
        </Grid>
        <Grid item>
          <span>{durationToStr(play?.duration || 0)}</span>
        </Grid>
      </Grid>
       </div>

    </div>
  )

}

export default Player;



