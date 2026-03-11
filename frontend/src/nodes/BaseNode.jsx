import { Handle, Position } from "reactflow";
import "./nodeStyles.css";

const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  children,
  width = 200,
  height = "auto",
  className = "",
}) => {
  return (
    <div 
      className={`base-node ${className}`} 
      style={{ width, height }}
    >
      {/* INPUT HANDLES */}
      {inputs.map((input, index) => (
        <Handle
          key={input}
          type="target"
          position={Position.Left}
          id={input}
          style={{ top: 40 + index * 20 }}
          className="node-handle node-handle-input"
        />
      ))}

      {/* NODE HEADER */}
      <div className="node-header">{title}</div>

      {/* NODE BODY */}
      <div className="node-body">{children}</div>

      {/* OUTPUT HANDLES */}
      {outputs.map((output, index) => (
        <Handle
          key={output}
          type="source"
          position={Position.Right}
          id={output}
          style={{ top: 40 + index * 20 }}
          className="node-handle node-handle-output"
        />
      ))}
    </div>
  );
};

export default BaseNode;
