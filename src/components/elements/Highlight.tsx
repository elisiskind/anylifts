import React, { FunctionComponent } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

export interface HighlightProps {
  invert?: boolean;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

const useStyles = makeStyles(({ palette }: Theme) => ({
  highlight: {
    fontFamily: "inherit",
    textTransform: "inherit",
    letterSpacing: "inherit",
    fontWeight: "inherit",
    color: ({ color, invert }: HighlightProps) =>
      invert
        ? palette[color ? color : "primary"].contrastText
        : palette[color ? color : "primary"].main,
    background: ({ color, invert }: HighlightProps) =>
      invert ? palette[color ? color : "primary"].main : "inherit",
    borderRadius: ({ invert }: HighlightProps) => (invert ? "6px" : 0),
    padding: ({ invert }: HighlightProps) => (invert ? "0 8px" : 0),
  },
}));

/**
 * Primary UI component for user interaction
 */
export const Highlight: FunctionComponent<HighlightProps> = ({
  invert,
  color,
  children,
}) => {
  const classes = useStyles({ invert, color });

  return <span className={`${classes.highlight}`}>{children}</span>;
};
