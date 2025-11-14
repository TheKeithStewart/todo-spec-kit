import type { Meta, StoryObj } from '@storybook/react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import Button from './Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a default card',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined card',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This is an elevated card with shadow',
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    variant: 'outlined',
    children: <div className="p-4">Card with no default padding</div>,
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    variant: 'outlined',
    children: 'Card with small padding',
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    variant: 'outlined',
    children: 'Card with large padding',
  },
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    interactive: true,
    children: 'Click me! I have hover effects',
  },
};

export const WithComposition: Story = {
  render: () => (
    <Card variant="elevated" className="w-96">
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
        <CardDescription>Organize your daily tasks efficiently</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          Track your focus blocks, manage integrations, and stay productive throughout your day.
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Google Calendar Integration
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Todoist Sync
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Focus Time Blocking
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">
          Get Started
        </Button>
        <Button variant="ghost" size="sm">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card variant="outlined" interactive className="w-80">
      <CardContent className="space-y-4">
        <div className="w-full h-40 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg" />
        <div>
          <CardTitle>Focus Block Pro</CardTitle>
          <CardDescription>Premium productivity features</CardDescription>
        </div>
        <p className="text-sm text-gray-600">
          Unlock advanced time blocking, unlimited integrations, and AI-powered scheduling.
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">$12</span>
          <span className="text-gray-500">/month</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="primary" fullWidth>
          Upgrade Now
        </Button>
      </CardFooter>
    </Card>
  ),
};
