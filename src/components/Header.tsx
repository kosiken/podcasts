import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
 





const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    mhomeIcon: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Header = ({className = "home" }) => {
  const classes = useStyles();

  return (

      <AppBar position="static" style={{ backgroundColor:"#ffffff", color: "#000000" }} elevation={0}>
        <Toolbar>
      
        
         
          <Typography variant="h6" className={classes.title}>
            Podcasts
          </Typography>
       
       
       
        </Toolbar>
      </AppBar>
 
  );
}
export default Header;

