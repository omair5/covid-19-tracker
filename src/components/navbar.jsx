import React, { useRef, useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { store } from './globalstate'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bgcolor: {
        backgroundImage: "linear-gradient(to right, #4880EC, #019ECD)",
        color: 'black'
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
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
        },
    },
    filter: {
        position: 'absolute',
        backgroundColor: 'rgb(40, 137, 226)',
        width: '100%',
        opacity:0.95
    },
    listitems: {
        listStyleType: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
        padding: '6px',
    }
}));

export default function Navbar() {
    // ----------LOGIC
    const classes = useStyles();
    const { countryPicker, HandleCountryChange } = useContext(store)
    const [searchResult, setSearchResult] = useState('')
    const [searchBarValue, setSearchBarValue] = useState('')
    const searchRef = useRef(null)
    // handleSearch
    const HandleSearch = (ValueToFilter) => {
        if(ValueToFilter===''){ setSearchResult('')}
        else{
        setSearchResult(countryPicker.filter(value => value.includes(ValueToFilter)).sort((a, b) => a.toLowerCase().indexOf(ValueToFilter) - b.toLowerCase().indexOf(ValueToFilter)))
        }
        setSearchBarValue(ValueToFilter)
    }
    // handleValue
    const handleValue = (value) => {
        setSearchBarValue(value)
        HandleCountryChange(value)
        setSearchResult('')
    }
    // outsideClick
    useEffect(() => {
        document.addEventListener('click', function (e) {
            // if(searchRef.contains(e.target))
            if (searchRef) {
                setSearchResult('')
            }
        })

    }, [searchRef])

    // ----------USER INTERFACE
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bgcolor}  >
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        COVID-19 TRACKER
                    </Typography>
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
                </Toolbar>
            </AppBar>
        </div>
    );
}