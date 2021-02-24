import React from 'react';
import Parser from 'rss-parser';
import { Podcast } from '../cast';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {
 MdExpandMore, MdSkipNext as SkipNextIcon, MdSkipPrevious as SkipPreviousIcon, MdPlayArrow as PlayArrowIcon
} from 'react-icons/md';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useHover from '@react-hook/hover'



type PlayerAudio ={
src: string;
typ: string;
title: string;
duration: number;
episode: number;
}
type PlayerProps = {
  podcast?: Podcast;
  key?: string | number;
  children?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
}

type EpisodeProps = {
episode: PlayerAudio;
className?: string;key?: string | number;  color: string;
  backgroundColor: string;
  
    onClick? : (episode: PlayerAudio) => void;
}


const DefaultPodCast: Podcast = {

  rss: "None",
  description_highlighted: "None",
  description_original: "None",
  title_highlighted: "None",
  title_original: "None",
  publisher_highlighted: "None",
  publisher_original: "None",

  thumbnail: "None",
  itunes_id: 2,
  latest_pub_date_ms: 2,
  earliest_pub_date_ms: 4,
  id: "None",
  genre_ids: [99, 6],
  listennotes_url: "None",
  total_episodes: 0,
  email: "None",
  explicit_content: false,
  website: "None",
  listen_score: "None",
  listen_score_global_rank: "None",
}


const useStyles = makeStyles((theme) => ({
  main: {
    'min-width': 300,
    position: 'fixed',
    bottom: 0,
    zIndex: 999,right:0,padding:'0 8px 8px',
    margin: '0 2px 2px 0',
    'box-shadow': 
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'

    
  },
  root: {
    display: 'flex','box-shadow': 'none',padding: 5,
    'justify-content': 'center',width: "100%"
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
padding: 0
  },
  cover: {
    width: 150,
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

episode:  {
    display: 'flex',
    alignItems: 'center',
    margin: '2px 0 10px',
    padding: '2px 5px', 'justify-content': 'center', cursor:'pointer'
    }

}));

const durationToStr= (dur: number) => {
let n = (Math.floor(dur/60)) +":";
let b  = (dur %60).toString();
 b = b.length < 2 ? ('0' + b): b 
 return n+b;
}
const  setTitle= (title: string, maxlen : number) =>{
if(title.length > maxlen) return title.slice(0, maxlen - 6)+'...';
return title;
}

const Episode: React.FunctionComponent<EpisodeProps> = ({episode: p, className, color, backgroundColor,onClick= ()=>{}  }) => {

const target = React.useRef<HTMLDivElement>(null);
 const isHovering = useHover(target)
return  (<div ref={target} className={className} style={{
  color: isHovering ? backgroundColor : color,
  backgroundColor: isHovering ? color : backgroundColor
}} onClick={() => {
    onClick(p)
    } }> 
   <Typography component="span" style={{flex:1}}>
   {p.episode}
    </Typography>
    
      <Typography style={{flex:8}}>
   {setTitle(p.title, 35)}
    </Typography>
       <Typography component="span" variant="caption" style={{flex:1}}>
   {durationToStr(p.duration)}
    </Typography>
    
  </div>
  )

}

const Player: React.FunctionComponent<PlayerProps> = ({ backgroundColor = "#ffffff",
  color = "#000000", podcast = DefaultPodCast }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  let [playlist, setPlaylist] = React.useState<PlayerAudio[]>([]);
    const [elapsed, setElapsed] = React.useState(0);
    let [play, setPlay] = React.useState<PlayerAudio>();
  const ref = React.useRef<HTMLAudioElement>(null);
   const [mError, setMError] = React.useState("");
  const parser = new Parser();
    const init = (): void => {
    (async () => {
        setElapsed(0);
        setPlaylist([])
        setPlay(undefined);
        let r = ref.current;
         setExpanded(false);
           setMError("" )
        if(r)
       { r.pause()
         r.currentTime =0
        }
      if(podcast.image) { 
      try{
      let feed = await parser.parseURL(podcast.rss);
      console.log(feed.items)
         let n: PlayerAudio[]= (feed.items.slice(0,10).filter(item => !!item.enclosure && !!item.title && !!item.itunes).map(item => {
         return {src: item.enclosure?.url || 'none',
         typ:item.enclosure?.type|| 'none',
         title: item.title || 'none',
         duration: item.itunes.duration,
         episode: item.itunes.episode
         }
    //  letitem.enclosure?.url)
    }));
    setPlaylist(n);
    setExpanded(true);
    
    }
    catch(err){
    setMError("Error loading Rss feed" )
    }
      }
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
  
  React.useEffect( ()=> {
init()
  },[podcast])
  React.useEffect( ()=> {
if(play){ console.log("yayy");
let r = ref.current
if(r){
r.src = play.src;
      r.addEventListener("timeupdate", ()=> {
      let e = (Math.floor(r?.currentTime || 0 ))
      
      setElapsed(e)
     if(play) setValue((e/play.duration)*100)
      });
      r.addEventListener("loadeddata", ()=>{
  if( r && (r.readyState >= 2)) r.play()
      });
}
}
  },[play])

const renderPlayList = () =>{


  if (expanded && podcast) return (
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
       {setTitle(podcast.title_original,35)}
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
        <AccordionDetails style={{display:'block', overflowY:'scroll', maxHeight:'300px'}}>
  {playlist.map((p,i)=>  {
  return (
  <Episode episode={p} className={classes.episode} key={'episode'+i} backgroundColor={backgroundColor} 
  color={color} onClick={setPlay}  />
  )
  })
  
  
  
  }

        </AccordionDetails>
        
        
  </Accordion>

  );
  
  if(podcast) return (
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
       {setTitle(podcast.title_original,35)}
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
        <AccordionDetails style={{display:'block', overflowY:'scroll', maxHeight:'300px'}}>
  {playlist.map((p,i)=>  {
  return (
  <Episode episode={p} className={classes.episode} key={'episode'+i} backgroundColor={backgroundColor} 
  color={color} onClick={setPlay}  />
  )
  })
  
  
  
  }
  <div style={{textAlign:"center",color}}>
  <CircularProgress color="inherit"  />
   </div>
        </AccordionDetails>
        
        
  </Accordion>
  )
  return <div/>
  }

  return (
    <div className={classes.main} style={{ backgroundColor, color }}>

    {renderPlayList()}
               <Typography style={{fontWeight: 'bold', textAlign: 'center' }}>
   {setTitle(play?.title || "No episode", 35)}
    </Typography>
    {!!mError.length && (  <Typography style={{ textAlign: 'center' }} variant="subtitle1">{mError}</Typography> )}
      <div className={classes.controls} style={{  color }}>
        <IconButton style={{  color }}>
          <SkipPreviousIcon />

        </IconButton>
          <IconButton style={{  color }}>

          <PlayArrowIcon className={classes.playIcon} />
        </IconButton>

          <IconButton style={{  color }}>
          <SkipNextIcon />
        </IconButton>


      </div>
      <Grid container spacing={2} style={{
        alignItems: 'center'
      }}>
      
 
        <Grid item>
          <span>{durationToStr(elapsed)}</span>
        </Grid>
        <Grid item xs>
          <Slider value={value} style={{  color }} disabled={play?.src ? false : true} onChange={(event, newValue) => {
         let r = ref.current;
         let num = Number(newValue)
           if(r && play) {
           r.pause()
          let n = (Math.round((num / 100) * play.duration))
          r.currentTime = n;
          r.play()
           }
           setValue(num);
          }} />
        </Grid>
        <Grid item>
          <span>{durationToStr(play?.duration|| 0)}</span>
        </Grid>
      </Grid>
      <audio ref={ref}>

      </audio>
    </div>
  )

}

export default Player;



