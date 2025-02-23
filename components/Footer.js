import { FaGithub, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import i18n from "../lib/i18n";

const Footer = () => {
  const socialLinks = [
    { Icon: FaGithub, url: "https://github.com/nesaranaeem" },
    { Icon: FaTwitter, url: "https://x.com/nesaranaeem" },
    { Icon: FaFacebook, url: "https://facebook.com/nesaranaeem" },
    { Icon: FaInstagram, url: "https://instagram.com/nesaranaeem" },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-center text-gray-600 dark:text-gray-300">
          {i18n.t("developedBy")}
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          {socialLinks.map(({ Icon, url }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
