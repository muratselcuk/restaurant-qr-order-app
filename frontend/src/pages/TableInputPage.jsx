import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

function TableInputPage() {
  const { tenantCode } = useParams();
  const [tableId, setTableId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tableId.trim()) {
      navigate(`/order/${tenantCode}/${tableId}`);
    }
  };

  return (
    <div>
      <h2>Masa Numarası Girin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          placeholder="Örn: 1"
        />
        <button type="submit">Siparişe Başla</button>
      </form>
    </div>
  );
}

export default TableInputPage;
