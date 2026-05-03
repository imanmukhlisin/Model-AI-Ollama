import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PredictorForm from "./components/PredictorForm";
import Riwayat from "./components/riwayat";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menu, setMenu] = useState("chat"); // "chat" atau "history"

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex bg-[#181a20] dark:bg-[#181a20]">
        <Sidebar darkMode={darkMode} onMenu={setMenu} />
        <div className="flex-1 ml-64 flex flex-col h-screen">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          {menu === "history" ? (
            <Riwayat darkMode={darkMode} />
          ) : (
            <PredictorForm darkMode={darkMode} />
          )}
        </div>
      </div>
    </div>
  );
}
