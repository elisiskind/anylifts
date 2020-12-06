import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {WaButton} from "./WaButton";

const useStyles = makeStyles({
  digit: {
    position: 'relative',
    display: 'inline-block',
    transform: 'translateY(0)',
    width: '.58em',
    textAlign: 'center',
    '&-up': {
      transform: 'translateY(-100%)'
    }
  },

  nextDigit: {
    position: 'absolute',
    top: '100%',
    left: '0'
  },
  timerWrapper: {
    display: 'inline-block',
    overflow: 'hidden'
  }
})

export const Timer = () => {
  const classes = useStyles()
  const [number, setNumber] = useState<number>(1)
  const nextNumber = () => {
    setNumber(number + 1)
  }

  return <Grid>
    <Grid container>
      <Grid item xs={12}>
        <div>
          {number}
        </div>
      </Grid>
      <Grid item xs={12}>
        <WaButton label={'Next Tick'} onClick={nextNumber}/>
      </Grid>
    </Grid>
  </Grid>
}