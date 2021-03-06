import React, { FunctionComponent } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

export interface PaperProps {
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";

  /**
   * Any custom classes go here
   */
  className?: string;

  onClick?: () => void;
}

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  paper: {
    backgroundColor: ({ color }: PaperProps) =>
      color ? palette[color].main : "white",
    border: ({ color }: PaperProps) =>
      color ? "none" : "2px solid " + palette.grey.A100,
    boxShadow: "none",
    borderRadius: 20,
    padding: spacing(4),
  },
  hoverable: {
    cursor: "pointer",
    transition: "none",
    position: "relative",
    "&:hover": {
      borderColor: palette.primary.main,
      boxShadow: "inset 0 4px " + palette.primary.dark,
      top: "4px",
      paddingBottom: "calc(" + spacing(4) + "px - 4px)",
      marginBottom: "4px",
    },
  },
}));

/**
 * Primary UI component for user interaction
 */
export const Paper: FunctionComponent<PaperProps> = ({
  color,
  className,
  onClick,
  children,
}) => {
  const classes = useStyles({ color });

  const paperClasses = [classes.paper];
  if (onClick) {
    paperClasses.push(classes.hoverable);
  }
  if (className) {
    paperClasses.push(className);
  }

  return (
    <div className={paperClasses.join(" ")} onClick={onClick}>
      {children}
    </div>
  );
};
