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

const useStyles = makeStyles(({ palette }: Theme) => ({
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
      return palette[color || "primary"][(outline || link) ? "main" : "contrastText"];
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
      switch (size ? size : "medium") {
        case "small":
          return outline ? "10px 18px" : "12px 20px";
        case "medium":
          return outline ? "15px 27px" : "18px 30px";
        case "large":
          return outline ? "22px 37px" : "25px 40px";
      }
    },
    "&:hover": {
      top:  ({ link }: AlButtonProps) => link ? 0 : "2px",
      boxShadow: ({ color, link }: AlButtonProps) => {
        return link ? "none" : "0 4px " + palette[color || "primary"].dark;
      },
      textDecoration: ({ link }: AlButtonProps) => link ? 'underline' : 'none'
    },
    "&:active": {
      top:  ({ link }: AlButtonProps) => link ? 0 : "6px",
      boxShadow: ({ color, link }: AlButtonProps) => {
        return link ? "none" : "0 0 " + palette[color || "primary"].dark;
      },
      textDecoration: ({ link }: AlButtonProps) => link ? 'underline' : 'none'
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
