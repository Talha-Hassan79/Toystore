const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 active:scale-95 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;