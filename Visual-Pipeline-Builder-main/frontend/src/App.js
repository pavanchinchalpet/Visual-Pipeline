import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ThemeToggle } from './ThemeToggle';
import { ActionButtons } from './ActionButtons';
import { ToastManager } from './ToastManager';

function App() {
  return (
    <div>
      <ThemeToggle />
      <PipelineToolbar />
      <ReactFlowProvider>
        <ActionButtons />
        <PipelineUI />
        <SubmitButton />
      </ReactFlowProvider>
      <ToastManager />
    </div>
  );
}

export default App;
