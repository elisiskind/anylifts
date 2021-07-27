import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { Button, Divider, Paper, TextInput } from "components/elements";
import { auth } from "index";
import firebase from "firebase/app";
import { CurrentUserContext } from "store/UserProvider";

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  loginContainer: {
    width: "80%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    padding: spacing(6),
    gap: spacing(4),
    margin: spacing(6, "auto"),
    alignItems: "center",
  },
  error: {
    color: palette.error.main,
  },
  signInContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing(2),
  },
  googleSignIn: {
    display: "flex",
    gap: spacing(2),
    alignItems: "center",
  },
}));

export const LoginView = () => {
  const classes = useStyles();
  const history = useHistory();

  const { data: user } = useContext(CurrentUserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        setError(false);
        history.push("/workout");
      })
      .catch((err: any) => {
        console.log(err);
        setError(true);
      });
  };

  const passwordSignIn = (email: string, password: string) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setError(false);
        history.push("/workout");
      })
      .catch(() => {
        setError(true);
      });
  };

  if (user) {
    return <Redirect to={"/workout"} />;
  }

  return (
    <Paper className={classes.loginContainer}>
      <h1>Sign In</h1>
      <div className={classes.signInContent}>
        <TextInput
          label={"Email Address"}
          onChange={setEmail}
          variant={"email"}
        />
        <TextInput
          label={"Password"}
          onChange={setPassword}
          variant={"password"}
        />
        <Button onClick={() => passwordSignIn(email, password)}>Sign In</Button>
      </div>
      <Divider label={"or"} />
      <div className={classes.signInContent}>
        <Button onClick={signInWithGoogle} size={"small"}>
          <div className={classes.googleSignIn}>
            <img src={"/google-logo.svg"} alt={"Google logo"} />
            Sign in with Google
          </div>
        </Button>
        {error && <div className={classes.error}>Login failed</div>}
      </div>
    </Paper>
  );
};
