const Login = () => {
  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-3 border rounded"
      />

      <button className="w-full bg-yellow-400 py-2 rounded">
        Login
      </button>
    </div>
  );
};

export default Login;