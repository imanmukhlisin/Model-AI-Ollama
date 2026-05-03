// sidebar.jsx
import React, { useEffect, useState } from "react";

export default function Sidebar({ darkMode, onMenu }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  return (
    <aside
      className={`h-screen w-64 flex flex-col p-6 fixed left-0 top-0 shadow-lg z-10 ${
        darkMode ? "bg-[#23262f] text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <div className="text-2xl font-bold mb-8 tracking-wide">AI Predictor</div>
      <nav>
        <ul className="space-y-4 mb-8">
          <li
            className={`font-semibold ${
              darkMode
                ? "text-[#7b5cff] hover:text-white"
                : "text-[#7b5cff] hover:text-black"
            } cursor-pointer transition`}
            onClick={() => onMenu("chat")}
          >
            Percakapan
          </li>
          <li
            className={`hover:text-[#7b5cff] cursor-pointer transition`}
            onClick={() => onMenu("history")}
          >
            Riwayat
          </li>
        </ul>
      </nav>
      <div className="flex-1 overflow-y-auto">
        <h2
          className={`text-base font-semibold mb-2 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Riwayat Chat Terakhir
        </h2>
        <ul className="space-y-1 pr-2">
          {history
            .filter((msg) => msg.role === "user")
            .slice(-5)
            .reverse()
            .map((msg, idx) => (
              <li
                key={idx}
                className={`truncate text-xs opacity-80 border-b py-1 ${
                  darkMode ? "border-gray-700" : "border-gray-300"
                }`}
                title={msg.content}
              >
                {msg.content}
              </li>
            ))}
          {history.filter((msg) => msg.role === "user").length === 0 && (
            <li className="text-xs text-gray-400">Belum ada riwayat.</li>
          )}
        </ul>
      </div>
      <div
        className={`mt-6 text-xs ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        © 2025 Mukhliz
      </div>
    </aside>
  );
}
