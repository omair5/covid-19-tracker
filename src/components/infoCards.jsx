import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { store } from './globalstate';
import CountUp from 'react-countup';

// ---------- STYLES
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '800px',
        margin: '0 auto',
        marginTop: '25px'

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
// ---------- STYLES

export default function InfoCards() {
    // ---------- USING STYLES
    const classes = useStyles();

    // ---------- LOGIC
    const { state:{confirmed,recovered,deaths,lastUpdate} } = useContext(store)
    // if(!state.confirmed){
    //     return 'loading....'
    // }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {/* INFECTED */}
                <Grid item xs={8} md={4}>
                    <Paper className={classes.paper} style={{ borderBottom: "15px solid #5496ff" }} >
                        <Typography variant="h5" gutterBottom> INFECTED</Typography>
                        <Typography variant="h6" gutterBottom>
                            <CountUp start={0} end={confirmed} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>Number Of Actice Cases</Typography>
                        <Typography>{lastUpdate === '' ? "Loading..." : new Date(lastUpdate).toDateString().toString()}</Typography>

                    </Paper>
                </Grid>

                {/* RECOVERED */}
                <Grid item xs={12} md={4}>
                    <Paper className={classes.paper} style={{ borderBottom: "15px solid #57ff70" }} >
                        <Typography variant="h5" gutterBottom> RECOVERED</Typography>
                        <Typography variant="h6" gutterBottom>
                            <CountUp start={0} end={recovered} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>Number Of Recovered People</Typography>
                        <Typography>{lastUpdate === '' ? "Loading..." : new Date(lastUpdate).toDateString().toString()}</Typography>

                    </Paper>
                </Grid>

                {/* DEATHS */}
                <Grid item xs={12} md={4}>
                    <Paper className={classes.paper} style={{ borderBottom: "15px solid #ff5757" }} >
                        <Typography variant="h5" gutterBottom> DEATHS</Typography>
                        <Typography variant="h6" gutterBottom>
                            <CountUp start={0} end={deaths} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>Number Of Deaths</Typography>
                        <Typography>{lastUpdate === '' ? "Loading..." : new Date(lastUpdate).toDateString().toString()}</Typography>

                    </Paper>
                </Grid>
            </Grid>

        </div>
    );
}
