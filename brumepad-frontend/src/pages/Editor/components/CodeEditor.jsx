import Editor from "@monaco-editor/react";

function CodeEditor() {
  return (
    <div className="h-screen flex flex-col  w-50%">
      <div className="p-2 bg-gray-800 text-white">BrumePad Editor</div>
      <div className="flex-1">
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// Start coding..."
        />
      </div>
    </div>
  );
}
export default CodeEditor;
