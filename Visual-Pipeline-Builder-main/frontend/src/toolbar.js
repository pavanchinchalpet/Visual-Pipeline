// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '24px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderBottom: '2px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            <h3 style={{ 
                margin: '0 0 20px 0', 
                color: '#1f2937',
                fontSize: '24px',
                fontWeight: '700',
                textAlign: 'center',
                letterSpacing: '-0.025em'
            }}>
                🔧 Visual Pipeline Builder
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
                <h4 style={{ 
                    margin: '0 0 12px 0', 
                    color: '#374151',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span style={{ 
                        width: '8px', 
                        height: '8px', 
                        backgroundColor: '#3b82f6', 
                        borderRadius: '50%' 
                    }}></span>
                    Core Nodes
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                    <DraggableNode type='llm' label='LLM' />
                </div>
            </div>

            <div>
                <h4 style={{ 
                    margin: '0 0 12px 0', 
                    color: '#374151',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span style={{ 
                        width: '8px', 
                        height: '8px', 
                        backgroundColor: '#10b981', 
                        borderRadius: '50%' 
                    }}></span>
                    Processing Nodes
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <DraggableNode type='math' label='Math' />
                    <DraggableNode type='delay' label='Delay' />
                    <DraggableNode type='merge' label='Merge' />
                    <DraggableNode type='logger' label='Logger' />
                    <DraggableNode type='apiRequest' label='API Request' />
                </div>
            </div>
        </div>
    );
};
