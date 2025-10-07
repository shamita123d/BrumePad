function OutputConsole() {
  return (
    <div className="bg-black text-green-400 text-sm font-mono p-2 h-32 overflow-y-auto border-t border-gray-800">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-400">Console Output:</span>
        <button className="text-red-400 hover:text-red-300 text-xs">
          Clear
        </button>
      </div>
      <p> Running code...</p>
      <p>Hello, World!</p>
    </div>
  );
}

export default OutputConsole;
