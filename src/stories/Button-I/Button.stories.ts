import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {Button} from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/Button-I',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        BorderColor: {control: 'color'},
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {onClick: fn()},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        primary: true,
        label: 'Create my account',
        disabled: false,
        icon: false
    },
};

export const Secondary: Story = {
    args: {
        label: 'Create my account',
        disabled: false,
        icon: false
    },
};


export const DisabledBtn: Story = {
    args: {
        size: 'small',
        label: 'Create my account',
        disabled: true,
        icon: false
    },
};

export const IconBtn: Story = {
    args: {
        BorderColor: 'yellow',
        size: 'small',
        label: 'Create my account',
        disabled: false,
        icon: true,
        imgLink: 'https://res.cloudinary.com/do5wu6ikf/image/upload/v1719703652/Reev/apple_wj0xsn.svg'
    },
};