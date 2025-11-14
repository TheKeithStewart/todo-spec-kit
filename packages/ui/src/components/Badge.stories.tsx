import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const WithDot: Story = {
  args: {
    variant: 'success',
    dot: true,
    children: 'Active',
  },
};

export const Removable: Story = {
  args: {
    variant: 'primary',
    children: 'Removable',
    onRemove: () => console.log('Removed'),
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'success',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    children: 'Verified',
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">React</Badge>
      <Badge variant="success">TypeScript</Badge>
      <Badge variant="info">Tailwind</Badge>
      <Badge variant="warning">Vite</Badge>
      <Badge variant="error" onRemove={() => console.log('Removed')}>
        Legacy
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Badge variant="success" dot>
          Online
        </Badge>
        <Badge variant="warning" dot>
          Away
        </Badge>
        <Badge variant="error" dot>
          Offline
        </Badge>
        <Badge variant="default" dot>
          Unknown
        </Badge>
      </div>
    </div>
  ),
};
