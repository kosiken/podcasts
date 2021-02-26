import React, { useState } from 'react'

import PodcastView from './PodcastView';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Category from './Category';
import Header from './Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, State, Action } from "../store"
import { PodcastsApiInstance } from '../api';
import { Dispatch } from 'redux';

const useStyles = makeStyles((theme) => ({
    loader: {
        height: '90vh', display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        width: '100%'
    }
    
}))

const PodcastGrid: React.FunctionComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch<Dispatch<Action>>()
    const { podcasts, isLoading: loading, page } = useSelector<AppState, State>((state) => {
        return state.app
    })
    const categories = ["All", "Comedy", "Sports",
    "Tech", "Lifestyle" ];
    const [mError, setMError] = useState("");
    const [sel, setSelected] = useState("All");
    const init = (): void => {

        PodcastsApiInstance.getPodcasts({ page: 1, limit:8 }).then(res => {
            dispatch({ type: "podcasts", podcasts: res })
            // setLoad(false);
            setMError("")
        }).catch(err => {
            console.log(err)
            setMError(err.message)
        })
    }

    React.useEffect(() => {
        init()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    if (mError.length) return (
        <div className={classes.loader}>
            <Typography >
                {mError}
            </Typography>
        </div>
    )
    if (loading) return (
        <div className={classes.loader}>
            <CircularProgress /><br/>
            <Typography >
                Loading Podcasts
            </Typography>

        </div>
    )

    return (
        <div className={"disp " + (page === "grid" ? "" : "nill")}>
        <Header /> 
        <section id="sel" style={{width: "80%",
        margin: "10px auto 0", padding:"8px" }}>
      {categories.map((cat, i) =>  (<Category key={""+i} category={cat} selected={sel === cat} 
      onClick={()=> {setSelected(cat)}} /> ))}
        
        </section>
        
        
            <Grid container className="podcasts">

                {podcasts.map((p, i) => (

                    <Grid item lg={3} sm={4} xs={6} key={'podcast' + i} ><PodcastView podcast={p} />

                    </Grid>))}

            </Grid>
    
        </div>
    )
}

export default PodcastGrid
