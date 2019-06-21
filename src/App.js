import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    card: {
        margin: theme.spacing(1,1,1,1)
    },
    title: {
        fontSize: 14,
    }
  }));

 function App() {
    const [searchString, setSearchString] = useState("react");
    const [data, setData] = useState({hits: []});
    let [delay, setDelay] = useState(1000);

    console.log("hey daata", data);
    
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    async function fetchData() {
        const result = await axios('https://hn.algolia.com/api/v1/search?query=' + searchString);
        setData(result.data);
    }

    useEffect(() => {
 
        fetchData();
        return() => {};
    }, [searchString]);

    useEffect(() => {
        const timerId = setInterval( () => fetchData(), 60000);

        return function cleanup(){
            clearInterval(timerId);
        }
    }, );



    const classes = useStyles();
    return(
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              React Reddit
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={searchString}
                inputProps={{ 'aria-label': 'Search' }}
                onChange={(e) => setSearchString(event.target.value)}
              />
            </div>
          </Toolbar>
        </AppBar>
        {/* {JSON.stringify(data.hits)} */}
        {data.hits.map(item => (
        <Card className={classes.card} raised={true}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {item.author}
        </Typography>
        <Typography variant="h5" component="h2">
        {item.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {formatDate(item.created_at)}
        </Typography>
        <Typography variant="body2" component="p">
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={item.url}>Learn More</Button>
      </CardActions>
    </Card>
     ))}
    </div>
      
    )
}

export default App;