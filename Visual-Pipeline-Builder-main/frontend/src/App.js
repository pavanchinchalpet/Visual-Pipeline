import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ThemeToggle } from './ThemeToggle';
import { ActionButtons } from './ActionButtons';
import { ToastManager } from './ToastManager';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

function App() {
  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <div>
      <ActionButtons />
      <ThemeToggle />
      <PipelineToolbar />
      <ReactFlowProvider>
        <PipelineUI />
        <SubmitButton />
      </ReactFlowProvider>
      <ToastManager />
    </div>
  );
}

export default App;
