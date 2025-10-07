function FileExplorer() {
  const files = ["main.js", "index.html", "style.css"];

  return (
    <div className="w-60 bg-gray-900 text-gray-300 p-3 flex flex-col">
      <h2 className="text-sm font-semibold mb-2 border-b border-gray-700 pb-1">
        Files
      </h2>

      <div className="flex-1 overflow-y-auto">
        {files.map((file, i) => (
          <div
            key={i}
            className="p-2 text-sm hover:bg-gray-800 rounded cursor-pointer"
          >
            📄 {file}
          </div>
        ))}
      </div>

      <button className="bg-blue-700 mt-3 py-1 rounded text-sm hover:bg-blue-600">
        + New File
      </button>
    </div>
  );
}

export default FileExplorer;
