import { useState, useEffect } from "react";
import { FaLink, FaCode, FaEye } from "react-icons/fa";
import axios from "axios";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JsonViewer from "../components/JsonViewer";
import LanguageModal from "../components/LanguageModal";
import JsonEditor from "../components/JsonEditor";
import Loader from "../components/Loader";
import i18n, { setLocale } from "../lib/i18n";

const Home = () => {
  const [inputType, setInputType] = useState("json");
  const [jsonInput, setJsonInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [headers, setHeaders] = useState("");
  const [userAgent, setUserAgent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
      if (!localStorage.getItem("language")) {
        setShowLanguageModal(true);
      }
    }
  }, []);

  // Function to handle JSON input changes
  const handleJsonChange = (value) => {
    setJsonInput(value);
    setShowPreview(false);
    try {
      if (!value.trim()) {
        setParsedJson(null);
        setError(null);
      } else {
        const parsed = JSON.parse(value);
        setParsedJson(parsed);
        setError(null);
      }
    } catch (err) {
      setParsedJson(null);
      setError(i18n.t("invalidJson"));
    }
  };

  // Function to handle URL input changes
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setUrlInput(url);
    setError(null);
    setShowPreview(false);

    // Validate URL format
    if (url.trim() && !/^https?:\/\//i.test(url)) {
      setError(i18n.t("invalidUrlFormat"));
    }
  };

  // Fetch JSON data from URL
  const fetchJson = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchOptions = {
        headers: headers ? JSON.parse(headers) : {},
      };
      if (userAgent) fetchOptions.headers["User-Agent"] = userAgent;
      const response = await axios.get(urlInput, fetchOptions);
      if (typeof response.data !== "object" || response.data === null) {
        throw new Error("Invalid JSON");
      }
      setParsedJson(response.data);
    } catch (err) {
      setParsedJson(null);
      setError(
        err.message === "Invalid JSON"
          ? i18n.t("invalidUrlJson")
          : `${i18n.t("fetchError")}: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Change language and update SEO tags dynamically
  const changeLanguage = (lang) => {
    setLoading(true);
    setLocale(lang); // Persist to localStorage and update i18n.locale via lib/i18n
    setTimeout(() => setLoading(false), 500); // Loader feedback
  };

  // Toggle theme
  const changeTheme = (theme) => {
    if (theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", "dark");
      }
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", "light");
      }
    }
  };

  // Toggle between JSON input and URL input
  const toggleInputType = () => {
    setInputType((prev) => (prev === "json" ? "url" : "json"));
    setError(null);
    setParsedJson(null);
    setJsonInput("");
    setUrlInput("");
    setShowAdvanced(false);
    setLoading(false);
    setShowPreview(false);
  };

  // Handle view button click
  const handleViewClick = () => {
    if (inputType === "json" && parsedJson) {
      setShowPreview(true);
    } else if (inputType === "url" && urlInput.trim()) {
      fetchJson().then(() => setShowPreview(true));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Dynamic SEO Tags */}
      <Head>
        <title>{i18n.t("title")}</title>
        <meta name="description" content={i18n.t("metaDescription")} />
        <meta
          name="keywords"
          content="JSON Viewer, JSON Formatter, JSON Parser"
        />
        <meta name="author" content="Nesar Ahmed Naeem" />
        <meta property="og:title" content={i18n.t("title")} />
        <meta property="og:description" content={i18n.t("metaDescription")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://json-viewer-app.vercel.app" />
      </Head>

      <Header
        changeLanguage={changeLanguage}
        setLoading={setLoading}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={toggleInputType}
              className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
              disabled={loading}
            >
              {inputType === "json" ? (
                <>
                  <FaLink className="mr-2" />
                  {i18n.t("url")}
                </>
              ) : (
                <>
                  <FaCode className="mr-2" />
                  {i18n.t("pasteData")}
                </>
              )}
            </button>
          </div>

          {inputType === "json" ? (
            <JsonEditor
              value={jsonInput}
              onChange={handleJsonChange}
              error={error}
              isDarkMode={isDarkMode}
            />
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {i18n.t("urlInstruction")}
              </p>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={i18n.t("urlPlaceholder")}
                value={urlInput}
                onChange={handleUrlChange}
                disabled={loading}
              />
              {error && inputType === "url" && !loading && (
                <p className="text-red-500 flex items-center justify-center">
                  <span className="mr-2">⚠️</span> {error}
                </p>
              )}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 transition-colors"
                disabled={loading}
              >
                {showAdvanced ? i18n.t("hideAdvanced") : i18n.t("showAdvanced")}
              </button>
              {showAdvanced && (
                <div className="space-y-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                      {i18n.t("headers")}
                    </label>
                    <textarea
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows="3"
                      value={headers}
                      onChange={(e) => setHeaders(e.target.value)}
                      placeholder='{"Authorization": "Bearer token"}'
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                      {i18n.t("userAgent")}
                    </label>
                    <input
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={userAgent}
                      onChange={(e) => setUserAgent(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleViewClick}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
              disabled={
                loading ||
                (inputType === "json" && !parsedJson) ||
                (inputType === "url" && (!urlInput.trim() || error))
              }
            >
              <FaEye className="mr-2" />
              {i18n.t("view")}
            </button>
          </div>

          {loading && <Loader />}
          {showPreview && parsedJson && !loading && (
            <div>
              <h2 className="text-xl font-semibold mb-2 dark:text-white text-center">
                {i18n.t("preview")}
              </h2>
              <JsonViewer data={parsedJson} />
            </div>
          )}
        </div>
      </main>

      <Footer />
      {showLanguageModal && (
        <LanguageModal
          setLanguage={changeLanguage}
          setTheme={changeTheme}
          onClose={() => setShowLanguageModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
