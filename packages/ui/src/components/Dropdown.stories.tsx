import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import Button from './Button';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const options = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Archive', value: 'archive' },
  { label: 'Delete', value: 'delete' },
];

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Actions</Button>,
    options,
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const WithIcons: Story = {
  args: {
    trigger: <Button variant="outline">More Options</Button>,
    options: [
      {
        label: 'Edit',
        value: 'edit',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        ),
      },
      {
        label: 'Copy',
        value: 'copy',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        ),
      },
      {
        label: 'Delete',
        value: 'delete',
        icon: (
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        ),
      },
    ],
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const AlignRight: Story = {
  args: {
    trigger: <Button variant="ghost">Menu</Button>,
    options,
    align: 'right',
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const WithDisabledOptions: Story = {
  args: {
    trigger: <Button variant="outline">Options</Button>,
    options: [
      { label: 'Available Option', value: 'available' },
      { label: 'Disabled Option', value: 'disabled', disabled: true },
      { label: 'Another Available', value: 'available2' },
    ],
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const CustomTrigger: Story = {
  args: {
    trigger: (
      <svg
        className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    ),
    options,
    onSelect: (value) => console.log('Selected:', value),
  },
};
