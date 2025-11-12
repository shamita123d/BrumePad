import { useEffect, useRef, useState } from 'react';
import Editor from '../components/Editor';
import FileManager from '../components/FileManager';

export default function Home() {
  const [fileManagerWidth, setFileManagerWidth] = useState(300);
  const [editorContent, setEditorContent] = useState('');
  const [editorLanguage, setEditorLanguage] = useState('javascript');
  const [currentFile, setCurrentFile] = useState(null);

  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const newWidth = e.clientX - containerLeft;
    if (newWidth > 150 && newWidth < window.innerWidth - 150) {
      setFileManagerWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      document.body.style.cursor = 'default';
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleFileOpen = (file) => {
    setCurrentFile(file);
    setEditorContent(file.content);
    setEditorLanguage(file.language || 'javascript');
  };

  const handleNewFile = (file) => {
    setCurrentFile(file);
    setEditorContent(file.content);
    setEditorLanguage(file.language || 'javascript');
  };

  return (
    <div ref={containerRef} className="h-full flex bg-gray-900 text-gray-100 font-mono overflow-hidden">
      {/* File Manager Pane */}
      <div
        className="bg-gray-850 rounded-l-xl p-4 shadow-lg overflow-y-auto"
        style={{ width: fileManagerWidth }}
      >
        <FileManager onFileOpen={handleFileOpen} onNewFile={handleNewFile} />
      </div>

      {/* Divider */}
      <div
        className="w-1 cursor-col-resize bg-gray-700"
        onMouseDown={handleMouseDown}
      />

      {/* Editor Pane */}
      <div className="flex-1 bg-gray-800 rounded-r-xl p-4 shadow-lg overflow-hidden">
        <Editor
          content={editorContent}
          setContent={setEditorContent}
          language={editorLanguage}
          setLanguage={setEditorLanguage}
          currentFile={currentFile}
          refreshFiles={() => {}}
        />
      </div>
    </div>
  );
}
