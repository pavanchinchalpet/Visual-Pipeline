import { useState, useEffect, useRef } from 'react';
import BaseNode from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeHeight, setNodeHeight] = useState(120);
  const textareaRef = useRef(null);

  // Extract variables from text
  useEffect(() => {
    const variableRegex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [];
    let match;
    
    while ((match = variableRegex.exec(currText)) !== null) {
      const variableName = match[1];
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }
    
    setVariables(matches);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
      
      // Update node height based on content
      const newHeight = Math.max(120, scrollHeight + 80);
      setNodeHeight(newHeight);
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create input handles for each variable
  const inputHandles = variables.map(variable => `${id}-${variable}`);

  return (
    <BaseNode
      title="Text"
      inputs={inputHandles}
      outputs={[`${id}-output`]}
      width={250}
      height={nodeHeight}
      className="text-node"
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}"
          style={{ minHeight: '60px' }}
        />
      </label>
      {variables.length > 0 && (
        <div style={{ marginTop: '8px', fontSize: '11px', color: '#6b7280' }}>
          Variables: {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};
