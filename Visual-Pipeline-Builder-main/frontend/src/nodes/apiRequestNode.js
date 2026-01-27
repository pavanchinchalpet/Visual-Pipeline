import { useState } from 'react';
import BaseNode from './BaseNode';

export const APIRequestNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <BaseNode
      title="API Request"
      inputs={[`${id}-url`, `${id}-headers`, `${id}-body`]}
      outputs={[`${id}-response`, `${id}-error`]}
      width={240}
      className="api-node"
    >
      <label>
        Method:
        <select value={method} onChange={handleMethodChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </label>
      <label>
        URL:
        <input 
          type="text" 
          value={url} 
          onChange={handleUrlChange}
          placeholder="https://api.example.com"
        />
      </label>
      <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '11px', marginTop: '8px' }}>
        Makes HTTP requests to external APIs
      </div>
    </BaseNode>
  );
};