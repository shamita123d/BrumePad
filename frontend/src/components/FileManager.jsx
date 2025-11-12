import { useEffect, useState } from 'react';
import axios from '../services/api';

export default function FileManager({ onFileOpen, onNewFile }) {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const [editingFileId, setEditingFileId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchFiles = async () => {
    const res = await axios.get('/files');
    setFiles(res.data);
  };

  useEffect(() => { fetchFiles(); }, []);

  const saveFile = async () => {
    if (!name) return alert('File must have a name');

    // Check for duplicate name
    const existing = files.find(f => f.name === name);
    if (existing) {
      return alert('File with this name already exists!');
    }

    try {
      const res = await axios.post('/files', { name, content, language: 'javascript' });
      fetchFiles();
      setName('');
      setContent('');
      onNewFile(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to save file');
    }
  };

  const deleteFile = async (id) => {
    await axios.delete(`/files/${id}`);
    setFiles(files.filter(f => f._id !== id));
  };

  const startEdit = (file) => {
    setEditingFileId(file._id);
    setEditName(file.name);
    setEditContent(file.content);
  };

  const cancelEdit = () => {
    setEditingFileId(null);
    setEditName('');
    setEditContent('');
  };

  const updateFile = async () => {
    // Check if updated name already exists for some other file
    const duplicate = files.find(f => f.name === editName && f._id !== editingFileId);
    if (duplicate) return alert('Another file with this name already exists!');

    try {
      await axios.post('/files', {
        _id: editingFileId,
        name: editName,
        content: editContent,
        language: 'javascript'
      });
      fetchFiles();
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert('Failed to update file');
    }
  };

  const openFile = (file) => {
    onFileOpen(file);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100 font-mono p-6">
      <h1 className="text-3xl font-bold mb-4 text-cyan-400">🖋️ File Manager</h1>

      <div className="flex gap-4 mb-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="File Name"
          className="flex-1 bg-gray-800 text-gray-100 px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          onClick={saveFile}
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded text-gray-900 font-bold shadow-lg transition"
        >
          Save
        </button>
      </div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="File Content"
        className="flex-1 bg-gray-800 text-gray-100 p-4 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none h-60 mb-6"
      />

      <div className="flex-1 overflow-y-auto bg-gray-850 p-4 rounded border border-gray-700">
        <h2 className="text-xl font-semibold mb-2 text-cyan-400">📂 Files</h2>
        <ul>
          {files.length === 0 ? (
            <li className="text-gray-500 italic">No files yet.</li>
          ) : files.map(f => (
            <li key={f._id} className="flex flex-col gap-2 py-2 px-2 mb-2 rounded hover:bg-gray-700 transition border-b border-gray-700">
              {editingFileId === f._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-gray-800 text-gray-100 px-2 py-1 rounded border border-gray-600"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="bg-gray-800 text-gray-100 p-2 rounded border border-gray-600 resize-none h-32"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={updateFile}
                      className="px-4 py-1 bg-green-500 hover:bg-green-600 rounded text-gray-900 font-bold"
                    >
                      Update ✅
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-1 bg-gray-600 hover:bg-gray-700 rounded text-gray-100 font-bold"
                    >
                      Cancel ❌
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="cursor-pointer" onClick={() => openFile(f)}>{f.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(f)}
                      className="text-yellow-400 hover:text-yellow-500"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteFile(f._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
