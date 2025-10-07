// Editor.jsx
import Navbar from "./components/Navbar";
import FileExplorer from "./components/FileExplorer";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";

function EditorPage() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <FileExplorer />
        <CodeEditor />
      </div>
      <OutputConsole />
    </div>
  );
}

export default EditorPage;
