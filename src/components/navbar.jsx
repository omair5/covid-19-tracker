import React, { useRef, useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { store } from './globalstate'
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bgcolor: {
        backgroundImage: "linear-gradient(to right, #4880EC, #019ECD)",
        color: 'black'
    },
    title: {
        display: 'block',
        [theme.breakpoints.down('md')]: {
            textAlign:'center',
            padding:'7px 0px',
            fontSize:'18px',
            fontWeight:'bolder'
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
        [theme.breakpoints.down('md')]: {  
          margin:'7px 0px'
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
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
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    filter: {
        position: 'absolute',
        backgroundColor: 'rgb(40, 137, 226)',
        width: '100%',
        opacity: 0.95
    },
    listitems: {
        listStyleType: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
        padding: '6px',
    }
}));

export default function Navbar() {
    // --------------------LOGIC
    // states
    const classes = useStyles();
    const { countryPicker, HandleCountryChange,closeBanner } = useContext(store)
    const [searchResult, setSearchResult] = useState('')
    const [searchBarValue, setSearchBarValue] = useState('')
    const searchRef = useRef(null)
    // handleSearch function
    const HandleSearch = (ValueToFilter) => {
        if (ValueToFilter === '') { setSearchResult('') }
        else {
            setSearchResult(countryPicker.filter(value => value.includes(ValueToFilter)).sort((a, b) => a.toLowerCase().indexOf(ValueToFilter) - b.toLowerCase().indexOf(ValueToFilter)))
        }
        setSearchBarValue(ValueToFilter)
    }
    // handleValue function
    const handleValue = (value) => {
        setSearchBarValue(value)
        HandleCountryChange(value)
        setSearchResult('')
    }
    // outsideClick event
    useEffect(() => {
        document.addEventListener('click', function (e) {
            // if(searchRef.contains(e.target))
            if (searchRef) {
                setSearchResult('')
            }
        })

    }, [searchRef])

    // -------------------USER INTERFACE
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bgcolor}  >
                <Toolbar>
                    <Grid container >
                        <Grid item xs={12} md={8}>
                            <Typography className={classes.title} variant="h5" noWrap>
                               <span>COVID-19 TRACKER <button className='precautions' onClick={closeBanner}>WHO PRECAUTIONS</button></span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.search} onChange={(e) => HandleSearch(e.target.value.toLowerCase())}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Enter Country…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchBarValue}
                                />
                                {searchResult === '' ? null : searchResult.length === 0 ? <div className={classes.filter} style={{ textAlign: 'center' }}><p>Result Not Found</p></div> :
                                    <div className={classes.filter} ref={searchRef}>
                                        <ul >
                                            {searchResult.map((value, i) => (<li className={classes.listitems} key={i} tabIndex='0' onClick={() => handleValue(value)}>{value}</li>))}
                                        </ul>
                                    </div>}
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}