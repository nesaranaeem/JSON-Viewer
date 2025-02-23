import { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaCopy,
  FaCube,
  FaList,
  FaFont,
  FaHashtag,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const JsonViewer = ({ data }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const renderValue = (value, key, depth = 0) => {
    const isObject = typeof value === "object" && value !== null;
    const isArray = Array.isArray(value);
    const uniqueKey = `${key}-${depth}`;

    if (!isObject) {
      let icon;
      if (typeof value === "string")
        icon = <FaFont className="text-green-500" size={12} />;
      else if (typeof value === "number")
        icon = <FaHashtag className="text-orange-500" size={12} />;
      else if (typeof value === "boolean")
        icon = value ? (
          <FaCheck className="text-blue-500" size={12} />
        ) : (
          <FaTimes className="text-red-500" size={12} />
        );
      else icon = <FaFont className="text-green-500" size={12} />; // Default to string icon for null/undefined

      return (
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 py-1">
          {icon}
          <span className="truncate">{String(value)}</span>
          <button
            onClick={() => copyToClipboard(String(value))}
            className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaCopy size={12} />
          </button>
        </div>
      );
    }

    const items = isArray ? value : Object.entries(value);
    const isExpanded = expanded[uniqueKey];

    return (
      <div className="ml-4 transition-all duration-200">
        <div
          className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
          onClick={() => toggleExpand(uniqueKey)}
        >
          {isObject && (
            <span className="mr-2 text-gray-500 dark:text-gray-400">
              {isExpanded ? (
                <FaChevronDown size={12} />
              ) : (
                <FaChevronRight size={12} />
              )}
            </span>
          )}
          {isArray ? (
            <FaList className="mr-2 text-purple-500" size={12} />
          ) : (
            <FaCube className="mr-2 text-blue-500" size={12} />
          )}
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {isArray
              ? `Array [${value.length}]`
              : `Object {${Object.keys(value).length}}`}
          </span>
        </div>
        {isExpanded && (
          <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
            {items.map((item, index) => {
              const [itemKey, itemValue] = isArray ? [index, item] : item;
              return (
                <div key={itemKey} className="my-1">
                  {!isArray && (
                    <span className="text-blue-600 dark:text-blue-400 font-medium mr-2">
                      {itemKey}:
                    </span>
                  )}
                  {renderValue(itemValue, `${uniqueKey}-${itemKey}`, depth + 1)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-mono text-sm bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {renderValue(data, "root")}
    </div>
  );
};

export default JsonViewer;
