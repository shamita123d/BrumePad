function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl p-6 rounded-2xl w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">BrumePad Login</h1>
        <input className="border w-full p-2 mb-3 rounded" placeholder="Email" />
        <input
          className="border w-full p-2 mb-4 rounded"
          placeholder="Password"
          type="password"
        />
        <button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </div>
    </div>
  );
}
export default Login;
