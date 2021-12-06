import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Timer } from "components/elements";
import Box from "@material-ui/core/Box";

export default {
  title: "elements/Timer",
  component: Timer,
} as Meta;

interface TimerStoryProps {
  startTime: number;
}

const Template: Story<TimerStoryProps> = ({ startTime }) => {
  const [time, setTime] = useState<number>(startTime);
  const [start, setStart] = useState<number>(Date.now());

  const addTime = (timeToAdd: number) => {
    setTime(time + timeToAdd);
  };

  return (
    <>
      <Timer
        addTime={addTime}
        time={time}
        start={start}
        onFinish={() => {
          console.log("Finished!");
        }}
      />
      <Box marginTop={3}>
        <button onClick={() => setStart(Date.now())}>Reset</button>
      </Box>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  startTime: 100,
};
