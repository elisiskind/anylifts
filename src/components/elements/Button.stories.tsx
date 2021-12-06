import React from "react";
import { Meta, Story } from "@storybook/react";

import { Button, ButtonProps } from "components/elements/Button";

export default {
  title: "elements/Button",
  component: Button,
} as Meta;

interface AlButtonStoryProps extends ButtonProps {
  label: string;
}

const Template: Story<AlButtonStoryProps> = (args) => {
  const onclick = () => {
    console.log("hello");
  };
  return (
    <div>
      <Button {...args} onClick={onclick}>
        {args.label}
      </Button>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  variant: "outline",
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
  label: "Button",
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  color: "secondary",
  variant: "outline",
  label: "Outline Button",
};

export const Link = Template.bind({});
Link.args = {
  variant: "link",
  label: "Link Button",
};
