import { useState } from 'react';
import BaseNode from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  const handleDelayChange = (e) => {
    setDelay(parseInt(e.target.value) || 0);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <BaseNode
      title="Delay"
      inputs={[`${id}-input`]}
      outputs={[`${id}-output`]}
      width={200}
      className="delay-node"
    >
      <label>
        Delay:
        <input 
          type="number" 
          value={delay} 
          onChange={handleDelayChange}
          min="0"
        />
      </label>
      <label>
        Unit:
        <select value={unit} onChange={handleUnitChange}>
          <option value="ms">Milliseconds</option>
          <option value="s">Seconds</option>
          <option value="m">Minutes</option>
        </select>
      </label>
      <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '11px', marginTop: '8px' }}>
        Adds timing delay to pipeline
      </div>
    </BaseNode>
  );
};