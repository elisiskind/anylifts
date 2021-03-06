import * as React from "react";
import { useState } from "react";
import { Fullscreen, FullscreenExit } from "@material-ui/icons";

import { Button } from "components/elements";

export const FullscreenToggle = () => {
  const toggleFullscreen = () => {
    if (!fullscreen) {
      setFullscreen(true);
      document.body.requestFullscreen().then((r) => setFullscreen(true));
    } else {
      document.exitFullscreen().then((r) => setFullscreen(false));
    }
  };

  const [fullscreen, setFullscreen] = useState<boolean>(false);

  return (
    <Button variant="link" onClick={toggleFullscreen}>
      {fullscreen ? <FullscreenExit /> : <Fullscreen />}
    </Button>
  );
};
