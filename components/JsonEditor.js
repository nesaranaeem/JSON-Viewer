import { useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

const JsonEditor = ({ value, onChange, error, isDarkMode }) => {
  useEffect(() => {
    require("ace-builds/src-noconflict/mode-json");
  }, []);

  return (
    <div className="relative">
      <AceEditor
        mode="json"
        theme={isDarkMode ? "monokai" : "github"}
        value={value}
        onChange={onChange}
        name="json-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false,
          fontSize: 14,
          showPrintMargin: false,
          showGutter: true,
          highlightActiveLine: true,
          wrap: true,
        }}
        width="100%"
        height="250px"
        className={`border rounded-lg shadow-sm ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        }`}
      />
      {error && (
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-red-700 dark:text-red-300 text-sm font-bold bg-white dark:bg-gray-900 px-2 py-1 rounded">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default JsonEditor;
