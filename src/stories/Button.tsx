import React from 'react';
import './button.css';
import {makeStyles, Theme} from "@material-ui/core/styles";

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
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

const useStyles = makeStyles(({breakpoints, spacing, palette}: Theme) => ({
  btnPrimary: {
    background: palette.primary.main,
    color: palette.primary.contrastText,
    border: 'none',
    boxShadow: '0 6px ' + palette.primary.dark,
    padding: '25px 40px',
    '&:hover': {
      boxShadow: '0 4px ' + palette.primary.dark,
    },
    '&:active': {
      boxShadow: '0 0 ' + palette.primary.dark,
    },
  },
  btnPrimary2: {
    background: '#fff',
    color: palette.primary.main,
    border: '3px solid ' + palette.primary.main,
    boxShadow: '0 6px ' + palette.primary.dark,
    padding: '22px 37px',
    '&:hover': {
      boxShadow: '0 4px ' + palette.primary.dark,
    },
    '&:active': {
      boxShadow: '0 0 ' + palette.primary.dark,
    },
  },
  btnSecondary: {
    background: palette.secondary.main,
    border: 'none',
    color: palette.secondary.contrastText,
    boxShadow: '0 6px ' + palette.secondary.dark,
    padding: '25px 40px',
    '&:hover': {
      boxShadow: '0 4px ' + palette.secondary.dark,
    },
    '&:active': {
      boxShadow: '0 0 ' + palette.secondary.dark,
    },
  },
  btnSecondary2: {
    background: '#fff',
    color: palette.secondary.main,
    border: '3px solid ' + palette.secondary.main,
    boxShadow: '0 6px ' + palette.secondary.dark,
    padding: '22px 37px',
    '&:hover': {
      boxShadow: '0 4px ' + palette.secondary.dark,
    },
    '&:active': {
      boxShadow: '0 0 ' + palette.secondary.dark,
    },
  },
  btn: {
    borderRadius: 20,
    cursor: 'pointer',
    margin: '15px 30px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 700,
    outline: 'none',
    position: 'relative',
    '&:hover': {
      top: '2px'
    },
    '&:active': {
      top: '6px'
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
export const Button: React.FC<ButtonProps> = ({
                                                secondary = false,
                                                outline = false,
                                                size = 'medium',
                                                label,
                                                ...props
                                              }) => {
  const classes = useStyles()

  const buttonColorClass = () => {
    if (!secondary) {
      if (!outline) {
        return classes.btnPrimary
      } else {
        return classes.btnPrimary2
      }
    } else {
      if (!outline) {
        return classes.btnSecondary
      } else {
        return classes.btnSecondary2
      }
    }
  }

  return (
    <button
      className={`${classes.btn} ${buttonColorClass()}`}
      {...props}
    >
      {label}
    </button>
  );
};
