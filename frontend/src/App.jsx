// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderPage from './pages/OrderPage';
import TableInputPage from './pages/TableInputPage';
import KitchenPage from './pages/KitchenPage';
import QRPreviewPage from './pages/QRPreviewPage';
import TenantSelectionPage from './pages/TenantSelectionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TenantSelectionPage />} />
        <Route path="/start/:tenantCode" element={<TableInputPage />} />
        <Route path="/order/:tenantCode/:tableId" element={<OrderPage />} />
        <Route path="/kitchen/:tenantCode" element={<KitchenPage />} />
        <Route path="/qr/:tenantCode/:tableId" element={<QRPreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
