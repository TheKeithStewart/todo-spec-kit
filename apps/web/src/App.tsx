import { useNavigate } from 'react-router-dom';
import { Button } from '@stackday/ui';

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">StackDay</h1>
        <p className="text-lg text-gray-600 mb-6">Productivity Platform</p>
        <p className="text-sm text-gray-500 mb-8">Development environment ready ✓</p>

        <div className="flex gap-4 justify-center">
          <Button variant="primary" onClick={() => navigate('/app/dashboard')}>
            View Prototype Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
