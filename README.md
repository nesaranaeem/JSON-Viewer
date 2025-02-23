---
# JSON Viewer

## License

A powerful and user-friendly **JSON Viewer** tool designed to help developers visualize, debug, and analyze JSON data effortlessly. Paste your JSON content or fetch it from a URL, and the tool will format and display it in a clean, interactive interface.
---

## Features

✅ **Paste JSON Content**: Directly paste your JSON data into the editor for instant formatting and visualization.  
✅ **Fetch JSON from URL**: Enter a valid URL to fetch and display JSON data dynamically.  
✅ **Advanced Options**: Add custom headers and user-agent settings for fetching JSON from secured APIs.  
✅ **Multi-Language Support**: Available in multiple languages (English, Bengali, German) for a global audience.  
✅ **Dark/Light Mode**: Switch between themes for a personalized experience.  
✅ **Real-Time Validation**: Get instant feedback on invalid JSON or malformed URLs.

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps to Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nesaranaeem/json-viewer.git
   cd json-viewer
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

### 1. Paste JSON Data

- Switch to the "Paste JSON" tab.
- Paste your JSON content into the editor.
- Click the **View** button to see the formatted output.

### 2. Fetch JSON from URL

- Switch to the "URL" tab.
- Enter a valid URL starting with `http://` or `https://`.
- Optionally, configure advanced options like headers or user-agent.
- Click the **View** button to fetch and display the JSON data.

### 3. Toggle Themes

- Use the theme toggle in the header to switch between light and dark modes.

### 4. Change Language

- Select your preferred language from the dropdown menu for a localized experience.

---

## Translations

The JSON Viewer supports multiple languages to cater to a global audience. Below are the currently supported languages:

| Language | Code | Example Translation |
| -------- | ---- | ------------------- |
| English  | `en` | "View" → "View"     |
| Bengali  | `bn` | "View" → "দেখুন"    |
| German   | `de` | "View" → "Ansehen"  |

To add more languages, update the `i18n` translation files in the `lib/i18n` directory.

---

## Technologies Used

- **Frontend**: React.js, Next.js, Tailwind CSS
- **HTTP Requests**: Axios
- **Internationalization**: i18next
- **Icons**: react-icons
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## License

This project is licensed under the **MIT License**.

---

## Acknowledgments

Built with ❤️ using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

---

## Developer

## Nesar Ahmed Naeem

- **GitHub**: [@nesaranaeem](https://github.com/nesaranaeem)
- **Website**: [https://nesaran.com](https://nesaran.com)
- **Social Media**: [@nesaranaeem](https://twitter.com/nesaranaeem) (Twitter, LinkedIn, etc.)

---

## Show Your Support

If you find this project useful, please give it a ⭐️ on GitHub! Your support motivates me to keep improving.

---
