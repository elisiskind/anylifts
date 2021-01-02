import React, { FunctionComponent } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

export interface AlButtonProps {
  /**
   * Color of button
   */
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";

  /**
   * Should the button be solid or outlined?
   */
  outline?: boolean;

  /**
   * Should the button be displayed like a link?
   */
  link?: boolean;

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
    borderTopLeftRadius: ({ flatLeft, flatTop }: AlButtonProps) =>
      flatLeft || flatTop ? 0 : 20,
    borderTopRightRadius: ({ flatRight, flatTop }: AlButtonProps) =>
      flatRight || flatTop ? 0 : 20,
    borderBottomRightRadius: ({ flatRight, flatBottom }: AlButtonProps) =>
      flatRight || flatBottom ? 0 : 20,
    borderBottomLeftRadius: ({ flatLeft, flatBottom }: AlButtonProps) =>
      flatLeft || flatBottom ? 0 : 20,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 700,
    outline: "none",
    top: 0,
    position: "relative",
    background: ({ outline, link, color }: AlButtonProps) => {
      if (outline || link) {
        return "#fff";
      }
      return palette[color || "primary"].main;
    },
    color: ({ outline, link, color }: AlButtonProps) => {
      return palette[color || "primary"][
        outline || link ? "main" : "contrastText"
      ];
    },
    border: ({ outline, color, link }: AlButtonProps) => {
      if (!outline || link) {
        return "none";
      } else {
        return "3px solid " + palette[color || "primary"].main;
      }
    },
    boxShadow: ({ color, link }: AlButtonProps) => {
      return link ? "none" : "0 6px " + palette[color || "primary"].dark;
    },
    padding: ({ outline, size }: AlButtonProps) => {
      const borderSize = outline ? 2 : 0;
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
      top: ({ link }: AlButtonProps) => (link ? 0 : "2px"),
      boxShadow: ({ color, link }: AlButtonProps) => {
        return link ? "none" : "0 4px " + palette[color || "primary"].dark;
      },
      textDecoration: ({ link }: AlButtonProps) =>
        link ? "underline" : "none",
    },
    "&:active": {
      top: ({ link }: AlButtonProps) => (link ? 0 : "6px"),
      boxShadow: ({ color, link }: AlButtonProps) => {
        return link ? "none" : "0 0 " + palette[color || "primary"].dark;
      },
      textDecoration: ({ link }: AlButtonProps) =>
        link ? "underline" : "none",
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
export const AlButton: FunctionComponent<AlButtonProps> = (props) => {
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
