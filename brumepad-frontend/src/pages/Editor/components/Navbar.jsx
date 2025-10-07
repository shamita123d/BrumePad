function Navbar() {
  return (
    <div className="flex items-center  px-8 py-2 bg-gray-900 shadow-lg border-b border-gray-700">
      {/* Left side: Logo + Title */}
      <div className="flex items-center gap-3 w-50% border:1">
        <img
          src="https://i.postimg.cc/N0xJzd5K/Untitled-design.png"
          alt="Logo"
          className="w-10 h-10  rounded-lg border border-gray-600 hover:scale-105 transition-transform"
        />
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Brume<span className="text-blue-500">Pad</span>
        </h1>
      </div>

      {/* Right side: Controls */}
      <div className="flex items-center gap-4">
        <select className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md border border-gray-700 hover:border-blue-500 transition">
          <option>JavaScript</option>
          <option>Python</option>
          <option>C++</option>
          <option>Java</option>
        </select>

        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md font-medium transition-all shadow-md hover:shadow-lg">
          Run ▶
        </button>

        <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1.5 rounded-md font-medium transition-all border border-gray-700 shadow-sm hover:shadow-md">
          Save 💾
        </button>

        <img
          src="https://ui-avatars.com/api/?name=User&background=1E40AF&color=fff"
          alt="Profile"
          className="w-9 h-9 rounded-full border border-gray-600 hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
}

export default Navbar;
