import React from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";

export interface ButtonProps {
  /**
   * Should this button use the secondary palette color?
   */
  secondary?: boolean;
  outline?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
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
    margin: (props: ButtonProps) => {
      const size = props.size ? props.size : 'medium'
      switch (size) {
        case "small": return spacing(1,2)
        case "medium": return spacing(2,3)
        case "large": return spacing(3,4)
      }
    },
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 700,
    outline: 'none',
    position: 'relative',
    background: (props: ButtonProps) => {
      if (props.outline) {
        return '#fff'
      }
      return  palette[props.secondary ? 'secondary' : 'primary'].main
    },
    color: (props: ButtonProps) => {
        return  palette[props.secondary ? 'secondary' : 'primary'][props.outline ? 'main' : 'contrastText']
    },
    border: (props: ButtonProps) => {
      if (!props.outline) {
        return 'none'
      } else {
        return '3px solid ' + palette[props.secondary ? 'secondary' : 'primary'].main
      }
    },
    boxShadow: (props: ButtonProps) => {
      return '0 6px ' +  palette[props.secondary ? 'secondary' : 'primary'].dark
    },
    padding:  (props: ButtonProps) => {
      const size = props.size ? props.size : 'medium'
      switch (size) {
        case "small": return props.outline ? '10px 18px' : '12px 20px'
        case "medium": return props.outline ? '15px 27px' : '18px 30px'
        case "large": return props.outline ? '22px 37px' : '25px 40px'
      }
    },
    '&:hover': {
      top: '2px',
      boxShadow: (props: ButtonProps) => {
        return '0 4px ' + palette[props.secondary ? 'secondary' : 'primary'].dark
      },
    },
    '&:active': {
      top: '6px',
      boxShadow: (props: ButtonProps) => {
        return '0 0 ' + palette[props.secondary ? 'secondary' : 'primary'].dark
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
export const Button = (props: ButtonProps) => {
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
