import { useState } from 'react';
import BaseNode from './BaseNode';

export const LoggerNode = ({ id, data }) => {
  const [logLevel, setLogLevel] = useState(data?.logLevel || 'info');
  const [includeTimestamp, setIncludeTimestamp] = useState(data?.includeTimestamp || true);

  const handleLogLevelChange = (e) => {
    setLogLevel(e.target.value);
  };

  const handleTimestampChange = (e) => {
    setIncludeTimestamp(e.target.checked);
  };

  return (
    <BaseNode
      title="Logger"
      inputs={[`${id}-data`]}
      outputs={[`${id}-logged`]}
      width={200}
      className="logger-node"
    >
      <label>
        Log Level:
        <select value={logLevel} onChange={handleLogLevelChange}>
          <option value="debug">Debug</option>
          <option value="info">Info</option>
          <option value="warn">Warning</option>
          <option value="error">Error</option>
        </select>
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input 
          type="checkbox" 
          checked={includeTimestamp} 
          onChange={handleTimestampChange}
          style={{ width: 'auto' }}
        />
        Include timestamp
      </label>
      <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '11px', marginTop: '8px' }}>
        Logs data for debugging
      </div>
    </BaseNode>
  );
};