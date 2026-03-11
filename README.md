# Visual Pipeline Builder

A React-based visual pipeline builder with drag-and-drop functionality and backend validation.

## Features

- **Node Abstraction**: Reusable BaseNode component for consistent styling and behavior
- **Dynamic Text Nodes**: Auto-resizing text nodes with variable detection and dynamic handle creation
- **Professional UI**: Polished interface with hover effects and consistent styling
- **5 New Node Types**: Math, Delay, Merge, Logger, and API Request nodes
- **Backend Integration**: Pipeline validation with DAG cycle detection
- **Real-time Feedback**: Submit pipeline for analysis and validation

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. Open your browser to `http://localhost:3000`

## Usage

1. **Drag and Drop**: Drag nodes from the toolbar to the canvas
2. **Connect Nodes**: Click and drag from output handles (green) to input handles (red)
3. **Configure Nodes**: Click on nodes to configure their properties
4. **Text Variables**: In text nodes, use `{{variableName}}` to create dynamic input handles
5. **Submit Pipeline**: Click "Submit Pipeline" to validate your workflow

## Node Types

### Core Nodes
- **Input**: Data entry points with configurable names and types
- **Output**: Data exit points with configurable names and types
- **Text**: Dynamic text processing with variable detection
- **LLM**: Language model processing with system and prompt inputs

### Processing Nodes
- **Math**: Mathematical operations (add, subtract, multiply, divide, power)
- **Delay**: Timing operations with configurable delays
- **Merge**: Combine multiple data streams
- **Logger**: Debug output with configurable log levels
- **API Request**: HTTP requests to external services

## Architecture

- **Frontend**: React + ReactFlow for visual interface
- **Backend**: FastAPI with Pydantic for data validation
- **Graph Theory**: DFS-based cycle detection for DAG validation
- **Component Design**: BaseNode abstraction for consistent node behavior

## Technical Highlights

- **Variable Detection**: Regex-based parsing of `{{variable}}` syntax
- **Auto-resize**: Dynamic node sizing based on content
- **DAG Validation**: Cycle detection using depth-first search
- **Professional Styling**: Gradient backgrounds, hover effects, and consistent typography
- **Type Safety**: Pydantic models for backend data validation