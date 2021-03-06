import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { Button, Divider, Paper, TextInput } from "components/elements";

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
}));

export const LoginView = () => {
  const classes = useStyles();
  const firebase = useFirebase();
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        setError(false);
        history.push("/workout");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  const passwordSignIn = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setError(false);
        history.push("/workout");
      })
      .catch(() => {
        setError(true);
      });
  };

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
        <Button onClick={signInWithGoogle} />
        {error && <div className={classes.error}>Login failed</div>}
      </div>
    </Paper>
  );
};
