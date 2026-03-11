import BaseNode from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[`${id}-system`, `${id}-prompt`]}
      outputs={[`${id}-response`]}
      width={200}
      className="llm-node"
    >
      <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '12px' }}>
        Large Language Model
      </div>
      <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '11px', marginTop: '4px' }}>
        Processes system prompt and user input
      </div>
    </BaseNode>
  );
};
