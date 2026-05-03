// PredictorForm.js
import React, { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

export default function PredictorForm({ darkMode, showHistory }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [files, setFiles] = useState([]);
  const [streamingAI, setStreamingAI] = useState(""); // Tambahkan state baru
  const chatEndRef = useRef(null);

  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() && files.length === 0) return;
    if (loading) return;

    const fileInfo = files.map((file) => {
      if (file.type.startsWith("image/")) return `Gambar: ${file.name}`;
      return `File: ${file.name}`;
    });

    const userMessage = {
      role: "user",
      content: [prompt, ...fileInfo].filter(Boolean).join("\n"),
      timestamp: new Date().toLocaleString(),
    };

    let lastIdx;
    setChat((prev) => {
      const updatedChat = [
        ...prev,
        userMessage,
        { role: "ai", content: "", timestamp: new Date().toLocaleString() },
      ];
      localStorage.setItem("chatHistory", JSON.stringify(updatedChat));
      lastIdx = updatedChat.length - 1;
      return updatedChat;
    });

    setPrompt("");
    setFiles([]);
    setLoading(true);

    const formData = new FormData();
    formData.append("prompt", prompt);
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("http://localhost:5000/api/chat-stream", {
        method: "POST",
        body: formData,
      });

      if (!response.body) throw new Error("Streaming tidak didukung browser.");

      const reader = response.body.getReader();
      let aiText = "";
      setStreamingAI(""); // Mulai streaming

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        aiText += chunk;
        setStreamingAI(aiText);
      }

      // Setelah selesai streaming, update bubble AI
      setChat((prev) =>
        prev.map((msg, idx) =>
          idx === lastIdx ? { ...msg, content: aiText } : msg
        )
      );
      setStreamingAI("");
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Gagal terhubung dengan server.",
          timestamp: new Date().toLocaleString(),
        },
      ]);
      setStreamingAI("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const savedChat = localStorage.getItem("chatHistory");
    if (savedChat) setChat(JSON.parse(savedChat));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <main
      className={`flex-1 overflow-y-auto p-0 bg-gradient-to-br ${
        darkMode ? "from-[#23262f] to-[#181a20]" : "from-blue-50 to-purple-50"
      }`}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 pt-8 pb-32 px-4">
        {showHistory ? (
          // TAMPILAN RIWAYAT CHAT
          <div>
            <h2
              className={`text-2xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Riwayat Chat
            </h2>
            <ul className="space-y-4">
              {chat
                .filter((msg) => msg.role === "user")
                .reverse()
                .map((msg, idx) => (
                  <li
                    key={idx}
                    className={`p-4 rounded-xl shadow ${
                      darkMode
                        ? "bg-[#23262f] text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="text-xs opacity-70 mb-1">
                      {msg.timestamp}
                    </div>
                    <div className="font-medium">{msg.content}</div>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <>
            {chat.length === 0 && (
              <div className="text-center py-20 animate-fade-in">
                <h2
                  className={`text-4xl font-extrabold mb-4 tracking-tight ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Selamat Datang di{" "}
                  <span className="text-[#7b5cff]">AI Predictor</span>!
                </h2>
                <p
                  className={`text-lg mb-6 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Tanyakan apa saja atau upload file untuk analisis.
                  <br />
                  <span className="font-semibold">
                    AI siap membantu Anda 🚀
                  </span>
                </p>
                <div className="flex justify-center gap-6 text-4xl">
                  <span className="animate-bounce">🤖</span>
                  <span className="animate-bounce delay-100">📄</span>
                  <span className="animate-bounce delay-200">💡</span>
                </div>
              </div>
            )}
            {chat.map(
              (msg, idx) =>
                !!msg.content && (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    } w-full animate-fade-in`}
                  >
                    <div
                      className={`relative p-6 rounded-3xl max-w-[80%] mb-4 shadow-xl transition-transform duration-200 hover:scale-[1.03] ${
                        msg.role === "user"
                          ? darkMode
                            ? "bg-gradient-to-br from-[#7b5cff] to-[#23262f] text-white self-end"
                            : "bg-gradient-to-br from-blue-500 to-blue-700 text-white self-end"
                          : darkMode
                          ? "bg-white text-gray-900 self-start"
                          : "bg-gray-100 text-gray-900 self-start"
                      }`}
                    >
                      {msg.role === "ai" ? (
                        <div className="prose prose-sm max-w-none prose-p:my-2 prose-li:my-1 prose-p:text-black prose-strong:text-black">
                          <ReactMarkdown>
                            {idx === chat.length - 1 && streamingAI
                              ? streamingAI
                              : msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="font-medium">{msg.content}</p>
                      )}
                    </div>
                  </div>
                )
            )}
          </>
        )}
        <div ref={chatEndRef} />
      </div>
      {/* Footer tetap di bawah, sticky */}
      {!showHistory && (
        <footer
          className={`fixed bottom-0 left-64 right-0 z-20 ${
            darkMode ? "bg-[#23262f]" : "bg-white"
          } border-t ${
            darkMode ? "border-gray-700" : "border-gray-300"
          } shadow-lg`}
        >
          <div className="w-full max-w-5xl mx-auto p-4 flex items-center gap-4">
            <form
              className="flex-1 flex items-center gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="file"
                multiple
                accept=".docx,.csv,image/*"
                onChange={handleFilesChange}
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } bg-transparent`}
                disabled={loading}
              />
              <TextareaAutosize
                className={`flex-1 border ${
                  darkMode
                    ? "border-gray-600 bg-gray-800 text-white"
                    : "border-gray-400 bg-white text-black"
                } px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7b5cff] transition resize-none`}
                placeholder="Ketik pertanyaan Anda..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                minRows={1}
                maxRows={5}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || (!prompt.trim() && files.length === 0)}
                className="px-6 py-3 bg-[#7b5cff] text-white rounded-xl shadow-md hover:bg-[#6a4fff] transition duration-200 flex items-center disabled:bg-gray-500 disabled:cursor-not-allowed font-semibold text-lg"
              >
                {loading ? (
                  <div className="loader border-2 border-t-white border-gray-400 rounded-full w-6 h-6 animate-spin"></div>
                ) : (
                  <>
                    Kirim <span className="ml-2">🚀</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </footer>
      )}
    </main>
  );
}
