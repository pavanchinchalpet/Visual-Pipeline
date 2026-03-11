// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    // Color mapping for different node types
    const getNodeColor = (nodeType) => {
      const colors = {
        customInput: '#3b82f6',
        customOutput: '#10b981',
        text: '#f59e0b',
        llm: '#8b5cf6',
        math: '#ef4444',
        delay: '#6b7280',
        merge: '#06b6d4',
        logger: '#84cc16',
        apiRequest: '#f97316'
      };
      return colors[nodeType] || '#6b7280';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '90px', 
          height: '50px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: getNodeColor(type),
          justifyContent: 'center', 
          flexDirection: 'column',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }} 
        draggable
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }}
      >
          <span style={{ 
            color: '#fff', 
            fontSize: '12px', 
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {label}
          </span>
      </div>
    );
  };
  