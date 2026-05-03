import React, { useEffect, useState } from "react";

export default function Riwayat({ darkMode }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleClear = () => {
    localStorage.removeItem("chatHistory");
    setHistory([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Riwayat Chat</h2>
      {history.length === 0 ? (
        <div className={`text-center py-10 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Belum ada riwayat chat.
        </div>
      ) : (
        <ul className="space-y-4 mb-8">
          {history.filter(msg => msg.role === "user").reverse().map((msg, idx) => (
            <li key={idx} className={`p-4 rounded-xl shadow ${darkMode ? "bg-[#23262f] text-white" : "bg-gray-100 text-gray-900"}`}>
              <div className="text-xs opacity-70 mb-1">{msg.timestamp}</div>
              <div className="font-medium whitespace-pre-line">{msg.content}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-end">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm shadow"
          disabled={history.length === 0}
        >
          Hapus Riwayat
        </button>
      </div>
    </div>
  );
}