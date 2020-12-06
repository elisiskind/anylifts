import React from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";

export interface WaButtonProps {

  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  outline?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * WaButton contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

const useStyles = makeStyles(({palette, spacing}: Theme) => ({
  btn: {
    borderRadius: 20,
    cursor: 'pointer',
    margin: (props: WaButtonProps) => {
      const size = props.size ? props.size : 'medium'
      switch (size) {
        case "small":
          return spacing(1, 2)
        case "medium":
          return spacing(2, 3)
        case "large":
          return spacing(3, 4)
      }
    },
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 700,
    outline: 'none',
    position: 'relative',
    background: (props: WaButtonProps) => {
      if (props.outline) {
        return '#fff'
      }
      return palette[props.color || 'primary'].main
    },
    color: (props: WaButtonProps) => {
      return palette[props.color || 'primary'][props.outline ? 'main' : 'contrastText']
    },
    border: (props: WaButtonProps) => {
      if (!props.outline) {
        return 'none'
      } else {
        return '3px solid ' + palette[props.color || 'primary'].main
      }
    },
    boxShadow: (props: WaButtonProps) => {
      return '0 6px ' + palette[props.color || 'primary'].dark
    },
    padding: (props: WaButtonProps) => {
      const size = props.size ? props.size : 'medium'
      switch (size) {
        case "small":
          return props.outline ? '10px 18px' : '12px 20px'
        case "medium":
          return props.outline ? '15px 27px' : '18px 30px'
        case "large":
          return props.outline ? '22px 37px' : '25px 40px'
      }
    },
    '&:hover': {
      top: '2px',
      boxShadow: (props: WaButtonProps) => {
        return '0 4px ' + palette[props.color || 'primary'].dark
      },
    },
    '&:active': {
      top: '6px',
      boxShadow: (props: WaButtonProps) => {
        return '0 0 ' + palette[props.color || 'primary'].dark
      },
    },
    '&:after': {
      content: '',
      position: 'absolute',
      zIndex: -1
    }
  }
}));

/**
 * Primary UI component for user interaction
 */
export const WaButton = (props: WaButtonProps) => {
  const classes = useStyles(props)

  return (
    <button
      className={`${classes.btn}`}
      {...props}
    >
      {props.label}
    </button>
  );
};
