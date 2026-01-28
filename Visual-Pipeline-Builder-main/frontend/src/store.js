// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    // History management
    history: [{
        nodes: [],
        edges: [],
        nodeIDs: {},
        timestamp: Date.now()
    }],
    historyIndex: 0,
    maxHistorySize: 50,
    
    // Save current state to history
    saveToHistory: () => {
        const currentState = {
            nodes: [...get().nodes],
            edges: [...get().edges],
            nodeIDs: {...get().nodeIDs},
            timestamp: Date.now()
        };
        
        const history = [...get().history];
        const historyIndex = get().historyIndex;
        
        // Remove any future history if we're not at the end
        const newHistory = history.slice(0, historyIndex + 1);
        
        // Add new state
        newHistory.push(currentState);
        
        // Limit history size
        const maxSize = get().maxHistorySize;
        if (newHistory.length > maxSize) {
            newHistory.shift();
        } else {
            set({ historyIndex: historyIndex + 1 });
        }
        
        set({ history: newHistory });
    },
    
    // Undo functionality
    undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
            const previousState = history[historyIndex - 1];
            set({
                nodes: [...previousState.nodes],
                edges: [...previousState.edges],
                nodeIDs: {...previousState.nodeIDs},
                historyIndex: historyIndex - 1
            });
        }
    },
    
    // Redo functionality
    redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
            const nextState = history[historyIndex + 1];
            set({
                nodes: [...nextState.nodes],
                edges: [...nextState.edges],
                nodeIDs: {...nextState.nodeIDs},
                historyIndex: historyIndex + 1
            });
        }
    },
    
    // Clear canvas
    clearCanvas: () => {
        // Save current state before clearing
        get().saveToHistory();
        set({
            nodes: [],
            edges: [],
            nodeIDs: {}
        });
        // Save the cleared state
        get().saveToHistory();
    },
    
    // Check if undo is available
    canUndo: () => {
        return get().historyIndex > 0;
    },
    
    // Check if redo is available
    canRedo: () => {
        const { history, historyIndex } = get();
        return historyIndex < history.length - 1;
    },
    
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        // Save state before adding node
        get().saveToHistory();
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
        // Only save to history for certain change types (not for drag operations)
        const shouldSaveHistory = changes.some(change => 
            change.type === 'remove' || 
            (change.type === 'position' && change.dragging === false)
        );
        
        if (shouldSaveHistory) {
            get().saveToHistory();
        }
        
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        // Save state before edge changes
        const shouldSaveHistory = changes.some(change => change.type === 'remove');
        
        if (shouldSaveHistory) {
            get().saveToHistory();
        }
        
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        // Save state before connecting
        get().saveToHistory();
        set({
            edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
        });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    node.data = { ...node.data, [fieldName]: fieldValue };
                }
        
                return node;
            }),
        });
    },
  }));
