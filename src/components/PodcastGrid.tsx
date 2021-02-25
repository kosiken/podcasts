import React, { useState, useEffect } from 'react'
import { Podcast } from '../cast';
import PodcastView from './PodcastView';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    },
    disp: {
        "height": "100vh",
        overflowY: "scroll",
        width: "70%"
    }
}))

const PodcastGrid: React.FunctionComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch<Dispatch<Action>>()
    // let [loading, setLoad] = useState(true);
    const { podcasts, isLoading: loading } =useSelector<AppState, State>((state)=> {
        return state.app
      })
    //  let [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [mError, setMError] = useState("");
    const init = (): void => {

        PodcastsApiInstance.getPodcasts({ page: 1 }).then(res => {
            dispatch({ type: "podcasts", podcasts: res })
            // setLoad(false);
            setMError("")
        }).catch(err => {
            console.log(err)
            setMError("Error loading podcasts")
        })
    }

    React.useEffect(() => {
        init()
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
            <CircularProgress />
            <Typography >
                Loading Podcasts
            </Typography>

        </div>
    )

    return (
        <div className={classes.disp}>
            <Grid container style={{ width: '80%' }}>

                {podcasts.map((p, i) => (

                    <Grid item lg={4} sm={6} xs={4} key={'podcast' + i} ><PodcastView podcast={p} />

                    </Grid>))}

            </Grid>
        </div>
    )
}

export default PodcastGrid
