import React, { FunctionComponent } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

export interface ButtonProps {
  /**
   * Color of button
   */
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";

  /**
   * Should the button be solid or outlined?
   */
  variant?: "normal" | "outline" | "link";

  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";

  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Should left side be flat?
   */
  flatLeft?: boolean;

  /**
   * Should right side be flat?
   */
  flatRight?: boolean;

  /**
   * Should top be flat?
   */
  flatTop?: boolean;

  /**
   * Should bottom be flat?
   */
  flatBottom?: boolean;

  /**
   * Any custom classes go here
   */
  className?: string;
}

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  btn: {
    display: "flex",
    alignItems: "center",
    borderTopLeftRadius: ({ flatLeft, flatTop }: ButtonProps) =>
      flatLeft || flatTop ? 0 : 20,
    borderTopRightRadius: ({ flatRight, flatTop }: ButtonProps) =>
      flatRight || flatTop ? 0 : 20,
    borderBottomRightRadius: ({ flatRight, flatBottom }: ButtonProps) =>
      flatRight || flatBottom ? 0 : 20,
    borderBottomLeftRadius: ({ flatLeft, flatBottom }: ButtonProps) =>
      flatLeft || flatBottom ? 0 : 20,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 700,
    outline: "none",
    top: 0,
    position: "relative",
    background: ({ variant, color }: ButtonProps) => {
      if (variant && variant !== "normal") {
        return "#fff0";
      }
      return palette[color || "primary"].main;
    },
    color: ({ variant, color }: ButtonProps) => {
      return palette[color || "primary"][
        variant && variant !== "normal" ? "main" : "contrastText"
      ];
    },
    border: ({ variant, color }: ButtonProps) => {
      if (variant === "outline") {
        return "3px solid " + palette[color || "primary"].main;
      } else {
        return "none";
      }
    },
    boxShadow: ({ color, variant }: ButtonProps) => {
      return variant === "link"
        ? "none"
        : "0 6px " + palette[color || "primary"].dark;
    },
    padding: ({ variant, size }: ButtonProps) => {
      const borderSize = variant === "outline" ? 2 : 0;
      switch (size ? size : "medium") {
        case "small":
          return (
            `calc(${spacing(1)}px - ${borderSize}px) ` +
            `calc(${spacing(2)}px - ${borderSize}px)`
          );
        case "medium":
          return (
            `calc(${spacing(2)}px - ${borderSize}px) ` +
            `calc(${spacing(3)}px - ${borderSize}px)`
          );
        case "large":
          return (
            `calc(${spacing(3)}px - ${borderSize}px) ` +
            `calc(${spacing(4)}px - ${borderSize}px)`
          );
      }
    },
    "&:hover": {
      top: ({ variant }: ButtonProps) => (variant === "link" ? 0 : "2px"),
      boxShadow: ({ color, variant }: ButtonProps) => {
        return variant === "link"
          ? "none"
          : "0 4px " + palette[color || "primary"].dark;
      },
      textDecoration: ({ variant }: ButtonProps) =>
        variant === "link" ? "underline" : "none",
    },
    "&:active": {
      top: ({ variant }: ButtonProps) => (variant === "link" ? 0 : "6px"),
      boxShadow: ({ color, variant }: ButtonProps) => {
        return variant === "link"
          ? "none"
          : "0 0 " + palette[color || "primary"].dark;
      },
      textDecoration: ({ variant }: ButtonProps) =>
        variant === "link" ? "underline" : "none",
    },
    "&:after": {
      content: "",
      position: "absolute",
      zIndex: -1,
    },
  },
}));

/**
 * Primary UI component for user interaction
 */
export const Button: FunctionComponent<ButtonProps> = (props) => {
  const classes = useStyles(props);
  const buttonClasses = props.className
    ? `${classes.btn} ${props.className}`
    : classes.btn;

  return (
    <button {...props} className={buttonClasses}>
      {props.children}
    </button>
  );
};
