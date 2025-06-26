import { Routes, Route } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { AddEditPage } from './pages/AddEditPage';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:id" element={<AddEditPage />} />
      </Routes>
    </>
  );
}

export default App;
