import { useState } from 'react';
import BaseNode from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concat');

  const handleMergeTypeChange = (e) => {
    setMergeType(e.target.value);
  };

  return (
    <BaseNode
      title="Merge"
      inputs={[`${id}-input1`, `${id}-input2`, `${id}-input3`]}
      outputs={[`${id}-merged`]}
      width={200}
      className="merge-node"
    >
      <label>
        Merge Type:
        <select value={mergeType} onChange={handleMergeTypeChange}>
          <option value="concat">Concatenate</option>
          <option value="join">Join with separator</option>
          <option value="array">Create array</option>
          <option value="object">Create object</option>
        </select>
      </label>
      <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '11px', marginTop: '8px' }}>
        Combines multiple data streams
      </div>
    </BaseNode>
  );
};