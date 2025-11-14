import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import { Button } from '@stackday/ui';
function App() {
  const navigate = useNavigate();
  return _jsx('div', {
    className: 'min-h-screen bg-gray-50 flex items-center justify-center',
    children: _jsxs('div', {
      className: 'text-center',
      children: [
        _jsx('h1', { className: 'text-4xl font-bold text-gray-900 mb-4', children: 'StackDay' }),
        _jsx('p', { className: 'text-lg text-gray-600 mb-6', children: 'Productivity Platform' }),
        _jsx('p', {
          className: 'text-sm text-gray-500 mb-8',
          children: 'Development environment ready \u2713',
        }),
        _jsx('div', {
          className: 'flex gap-4 justify-center',
          children: _jsx(Button, {
            variant: 'primary',
            onClick: () => navigate('/app/dashboard'),
            children: 'View Prototype Dashboard',
          }),
        }),
      ],
    }),
  });
}
export default App;
//# sourceMappingURL=App.js.map
