import React from 'react';
import {Box, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});

export const Workout = () => {

    const classes = useStyles();

    return <Box className={classes.root}>
        <Grid container>
            <Grid item xs={3}>
                <Link to="/">Home</Link>
            </Grid>
            <Grid item xs={3}>
                <Link to="/workout">Start Workout</Link>
            </Grid>
            <Grid item xs={3}>
                <Link to="/routines">My Routines</Link>
            </Grid>
            <Grid item xs={3}>
                <Link to="/exercises">My Exercises</Link>
            </Grid>
        </Grid>
    </Box>
}