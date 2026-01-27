import { useState } from 'react';
import BaseNode from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  return (
    <BaseNode
      title="Math"
      inputs={[`${id}-a`, `${id}-b`]}
      outputs={[`${id}-result`]}
      width={200}
      className="math-node"
    >
      <label>
        Operation:
        <select value={operation} onChange={handleOperationChange}>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
          <option value="power">Power (^)</option>
        </select>
      </label>
      <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '11px', marginTop: '8px' }}>
        Performs mathematical operations
      </div>
    </BaseNode>
  );
};