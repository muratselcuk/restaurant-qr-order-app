// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderPage from './pages/OrderPage';
import TableInputPage from './pages/TableInputPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/start/:tenantCode" element={<TableInputPage />} />
        <Route path="/order/:tenantCode/:tableId" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
