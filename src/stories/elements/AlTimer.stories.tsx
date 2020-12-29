import React, {useState} from 'react';
import {Meta, Story} from '@storybook/react';
import {AlTimer} from "../../components/elements/AlTimer";

export default {
  title: 'elements/AlTimer',
  component: AlTimer,
} as Meta;

interface AlTimerStoryProps {
  startTime: number;
}

const Template: Story<AlTimerStoryProps> = ({startTime}: AlTimerStoryProps) => {
  const [time, setTime] = useState<number>(startTime);

  const addTime = (timeToAdd: number) => {
    setTime(time + timeToAdd);
  }

  return <AlTimer addTime={addTime} time={time} onFinish={() => {
    console.log('Finished!')
  }}/>;
}

export const Default = Template.bind({});
Default.args = {
  startTime: 100
};
