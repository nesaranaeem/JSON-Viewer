import i18n from "../lib/i18n";

const LanguageModal = ({ setLanguage, setTheme, onClose }) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "bn", name: "বাংলা" },
  ];

  const themes = [
    { code: "light", name: "Light" },
    { code: "dark", name: "Dark" },
  ];

  const handleSave = (lang, theme) => {
    setLanguage(lang);
    setTheme(theme);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          {i18n.t("selectLanguage")}
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Language
            </label>
            <select
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={i18n.locale || "en"}
              id="language-select"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Theme
            </label>
            <select
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={localStorage.getItem("theme") || "light"}
              id="theme-select"
            >
              {themes.map((theme) => (
                <option key={theme.code} value={theme.code}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() =>
              handleSave(
                document.getElementById("language-select").value,
                document.getElementById("theme-select").value
              )
            }
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {i18n.t("save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
