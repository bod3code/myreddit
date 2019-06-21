import React, { useState, useEffect } from 'react';
import axios from 'axios';

// my components
import DataCards from './components/DataCards';

//material ui dependencies
import { 
  AppBar
  , FormControl
  , InputBase
  , InputLabel
  , MenuItem
  , Select
  , Toolbar
  , Typography  } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

// this uses the themeing from material ui and creates what 
// is needed for the `classes` object used to style components
// you can add a class here and use it in the JSX below
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
    select: {
      backgroundColor: 'white',
      width: '200px',
      height: '63px',
      padding: '20px',
      marginBottom: '15px',
      marginLeft: '20px'
    }
  }));

 function App() {
    const [searchString, setSearchString] = useState("React");
    const [data, setData] = useState({hits: []});
    
    const now = new Date();

    //years are for the Recency Select component
    const years = [];
    for(let yearsAgo=0; yearsAgo < 5; yearsAgo++){
      years.push(now.getFullYear() - yearsAgo);
    }
    const [recency, setRecency] = useState(years.pop());
    
    async function fetchData() {
        const unfilteredResult = await axios('https://hn.algolia.com/api/v1/search?query=' + searchString);
        // only show items that are recent to a given year
        console.log("HERE",unfilteredResult.data);
        unfilteredResult.data.hits = unfilteredResult.data.hits.filter(item => new Date(item.created_at).getFullYear() > new Date(recency) )
        setData(unfilteredResult.data);
    }

    useEffect(() => {
 
        fetchData();
        return() => {};
    }, [searchString, recency]);

    useEffect(() => {
        const timerId = setInterval( () => fetchData(), 6000);
        
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
                Recent {searchString} Reader
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
            <FormControl variant="filled">
                    <InputLabel
                      style={{
                        color: "black",
                        paddingTop: 15,
                        marginLeft: "20px"
                      }}
                    >
                      Recency
                    </InputLabel>
                    <Select
                      className={classes.select}
                      value={recency}
                      onChange={event => setRecency(event.target.value)}
                    >
                      {years.map((year, index) => {
                        return (
                          <MenuItem key={index} value={year}>
                            {year}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
          </Toolbar>
        </AppBar>
        {JSON.stringify(data)}
        <DataCards data={data}></DataCards>
    </div>  
    )
}

export default App;