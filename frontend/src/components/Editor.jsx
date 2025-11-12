import MonacoEditor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import axios from '../services/api';

export default function Editor({ content, setContent, language, setLanguage, currentFile, refreshFiles }) {
  const [output, setOutput] = useState('');
  const [outputHeight, setOutputHeight] = useState(160);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleRun = async () => {
    try {
      const res = await axios.post('/code/run', { language, code: content });
      setOutput(res.data.output);
    } catch (err) {
      setOutput(err.response?.data?.error || 'Error running code');
    }
  };

  const handleSave = async () => {
    if (!currentFile) {
      alert('No file selected!');
      return;
    }
    try {
      const payload = {
        _id: currentFile._id,
        name: currentFile.name || 'Untitled',
        content,
        language
      };
      await axios.post('/files', payload);
      alert('File saved!');
      if (refreshFiles) refreshFiles();
    } catch (err) {
      console.error(err);
      alert('Failed to save file!');
    }
  };

  const handleMouseDown = () => { isDragging.current = true; document.body.style.cursor = 'row-resize'; };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const containerBottom = containerRef.current.getBoundingClientRect().bottom;
    const newHeight = containerBottom - e.clientY;
    if (newHeight > 80 && newHeight < window.innerHeight - 100) setOutputHeight(newHeight);
  };
  const handleMouseUp = () => { if (isDragging.current) { isDragging.current = false; document.body.style.cursor = 'default'; } };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
  }, []);

  return (
    <div ref={containerRef} className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-cyan-400 text-2xl font-bold">💻 Code Editor</h1>
        <div className="flex gap-2 items-center">
          <button onClick={handleRun} className="px-4 py-1 bg-cyan-500 hover:bg-cyan-600 rounded text-gray-900 font-bold shadow-lg transition">Run ▶️</button>
          <button onClick={handleSave} className="px-4 py-1 bg-green-500 hover:bg-green-600 rounded text-gray-900 font-bold shadow-lg transition">Save 💾</button>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-800 text-gray-100 px-3 py-1 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>

      <div className="flex-1">
        <MonacoEditor height="100%" language={language} value={content} onChange={setContent} theme="vs-dark" options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }} />
      </div>

      <div className="h-1 bg-gray-700 cursor-row-resize" onMouseDown={handleMouseDown} />

      <div className="bg-gray-800 p-4 rounded border border-gray-700 overflow-auto" style={{ height: outputHeight }}>
        <h2 className="text-cyan-400 font-semibold mb-2">🖥️ Output:</h2>
        <pre className="text-gray-100">{output}</pre>
      </div>
    </div>
  );
}
