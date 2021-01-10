import React from "react";
import { ListItemIcon, Theme } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AlButton } from "./elements/AlButton";
import { makeStyles } from "@material-ui/core/styles";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  action?: () => void;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  button: {
    margin: spacing(2, 1),
    display: "flex",
    justifyContent: "left",
    whiteSpace: "nowrap",
    width: "calc(100% - " + spacing(2) + "px)",
    fontSize: 16,
  },
  icon: {
    minWidth: 0,
    marginRight: spacing(2),
    fontSize: 48,
  },
}));

export function ListItemLink({ primary, icon, to, action }: ListItemLinkProps) {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => {
    history.push(to);
    if (action) {
      action();
    }
  };

  return (
    <AlButton
      onClick={handleClick}
      size={"small"}
      className={classes.button}
      variant="outline"
    >
      <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
      {primary}
    </AlButton>
  );
}
