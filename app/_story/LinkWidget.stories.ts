import { Meta, StoryObj } from "@storybook/react";
import LinkWidget from "../../stories/LinkWidget";

const meta = {
  title: "LinkWidget",
  component: LinkWidget,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   columnSpan : {"1"},
  // },
} satisfies Meta<typeof LinkWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pill: Story = {
  args: {
    columnSpan: "1",
  },
};

export const Large: Story = {
  args: {
    columnSpan: "2",
  },
};
