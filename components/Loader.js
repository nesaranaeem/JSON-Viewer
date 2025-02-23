import { FaSpinner } from "react-icons/fa";
import i18n from "../lib/i18n";

const Loader = () => (
  <div className="flex items-center justify-center py-4">
    <FaSpinner className="animate-spin text-blue-500" size={24} />
    <span className="ml-2 text-gray-600 dark:text-gray-300">
      {i18n.t("loading")}
    </span>
  </div>
);

export default Loader;
