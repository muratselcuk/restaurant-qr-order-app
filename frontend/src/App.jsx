// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderPage from './pages/OrderPage';
import TableInputPage from './pages/TableInputPage';
import KitchenPage from './pages/KitchenPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/start/:tenantCode" element={<TableInputPage />} />
        <Route path="/order/:tenantCode/:tableId" element={<OrderPage />} />
        <Route path="/kitchen/:tenantCode" element={<KitchenPage />} />
        <Route path="/" element={<h1>Welcome to the Restaurant App 5</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
