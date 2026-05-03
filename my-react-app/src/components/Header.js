// header.jsx
export default function Header({ darkMode, setDarkMode }) {
  return (
    <header
      className={`w-full px-5 py-3 border-b shadow-md ${
        darkMode ? "bg-[#181a20] border-[#23262f]" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div
            className={`text-xl font-bold ${
              darkMode
                ? "text-[#7b5cff] hover:text-white"
                : "text-[#7b5cff] hover:text-black"
            } transition duration-100`}
          >
            Dasbor AI
          </div>
          <div
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Asisten pintar Anda
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-1 rounded transition ${
            darkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {darkMode ? "🌙 Gelap" : "☀️ Terang"}
        </button>
      </div>
    </header>
  );
}