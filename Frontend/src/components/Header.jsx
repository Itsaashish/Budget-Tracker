import { MoonIcon, SunIcon } from "lucide-react";

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Budget Tracker</h1>
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>
    </header>
  );
}

export default Header;
