import ThemeToggle from "./ThemeToggle";
import i18n from "../lib/i18n";

const Header = ({ changeLanguage, setLoading, isDarkMode, setIsDarkMode }) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "bn", name: "বাংলা" },
  ];

  const handleLanguageChange = (lang) => {
    setLoading(true);
    changeLanguage(lang);
    setTimeout(() => setLoading(false), 500); // Simulate loading for better UX
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {i18n.t("title")}
        </h1>
        <div className="flex items-center space-x-4">
          <select
            className="bg-gray-100 dark:bg-gray-700 border rounded px-2 py-1 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleLanguageChange(e.target.value)}
            value={i18n.locale || "en"} // Fallback to 'en' if locale is undefined
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
