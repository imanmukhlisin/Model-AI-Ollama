# 🤖 Model-AI-Ollama

> A Modern Web Application for Interacting with AI Models Using Ollama and Hugging Face

![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-66.6%25-yellow?logo=javascript&logoColor=white)
![Python](https://img.shields.io/badge/Python-22.9%25-green?logo=python&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Contributing](#-contributing)

## ✨ Key Features

### 🎯 Advanced AI Integration
- **Ollama Models**: Support for local models using Ollama
- **Hugging Face Inference**: Integration with leading models from Hugging Face
- **Markdown Rendering**: Display AI output with elegant markdown formatting
- **Chat Interface**: Responsive and user-friendly conversation interface

### 📂 File Processing
- **Document Upload**: Support for various file formats
- **CSV Parser**: Parse CSV files with PapaParse
- **Word Documents**: Extract text from Word documents using Mammoth
- **Auto-resize Textarea**: Text input that automatically adjusts in size

### 🎨 Modern UI/UX
- **Tailwind CSS**: Modern styling with utility-first approach
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Typography Plugin**: Tailwind plugin for professional typography
- **Smooth Interactions**: Smooth animations and transitions

### 🧪 Testing & Quality Assurance
- **React Testing Library**: Comprehensive testing utilities
- **Jest Integration**: Unit tests and integration tests
- **Web Vitals**: Application performance monitoring

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **React DOM 19.2.0** - React renderer for web
- **Tailwind CSS 3.4.18** - Utility-first styling
- **@tailwindcss/typography 0.5.19** - Typography plugin
- **React Markdown 10.1.0** - Safe markdown rendering

### AI & ML
- **@huggingface/inference 4.11.3** - Hugging Face SDK
- **Ollama** - Local AI models

### File Processing
- **Mammoth 1.11.0** - Parse Word documents
- **PapaParse 5.5.3** - CSV parser
- **resolve-url-loader 5.0.0** - URL resolution loader

### Development
- **React Scripts 5.0.1** - Create React App scripts
- **PostCSS 8.5.6** - CSS transformation
- **Autoprefixer 10.4.21** - Browser prefix automation

### Testing
- **@testing-library/react 16.3.0** - React testing utilities
- **@testing-library/jest-dom 6.9.1** - Jest matchers
- **@testing-library/user-event 13.5.0** - User interaction simulation

## 🚀 Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Python 3.8+ (for compatible backend)
- Ollama (optional, for local models)

### Steps

1. **Clone Repository**
```bash
git clone https://github.com/imanmukhlisin/Model-AI-Ollama.git
cd Model-AI-Ollama
```

2. **Install Dependencies**
```bash
cd my-react-app
npm install
```

3. **Setup Environment Variables**
Create a `.env.local` file in the `my-react-app` directory:
```env
# Hugging Face API
REACT_APP_HF_TOKEN=your_hugging_face_token

# Ollama Configuration (if using)
REACT_APP_OLLAMA_BASE_URL=http://localhost:11434
REACT_APP_OLLAMA_MODEL=llama2
```

4. **Run Development Server**
```bash
npm start
```
The application will open at `http://localhost:3000`

## 💻 Usage

### Chatting with AI
1. Type your message in the textarea
2. Select an AI model (Ollama or Hugging Face)
3. Click the "Send" button or press Ctrl+Enter
4. View the response rendered with markdown

### Upload & Process Files
1. Click the "Upload File" button
2. Select a file (CSV, Word, or text)
3. The system will automatically process the file
4. Results will be displayed in the chat interface

### Customize Model
1. Open settings
2. Select the model you want to use
3. Adjust parameters such as temperature, max_tokens
4. Save the configuration

## 📁 Project Structure

```
Model-AI-Ollama/
├── my-react-app/              # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── backend/                   # Backend (Python/Node)
│   └── api/                   # API endpoints
├── docs/                      # Documentation
├── .env.local                 # Environment variables (local)
├── .gitignore
└── README.md
```

## ⚙️ Configuration

### Tailwind CSS
Configuration file: `my-react-app/tailwind.config.js`
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Custom theme configuration
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### React Scripts
Development and production builds are configured through `package.json`:
```bash
npm start      # Development server
npm run build  # Production build
npm test       # Run tests
```

## 🔧 API Integration

### Hugging Face Integration
```javascript
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.REACT_APP_HF_TOKEN);

const response = await hf.textGeneration({
  model: "gpt2",
  inputs: "Hello, how are you?",
  parameters: {
    max_new_tokens: 100,
  },
});
```

### Ollama Integration
```javascript
const response = await fetch(
  `${process.env.REACT_APP_OLLAMA_BASE_URL}/api/generate`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.REACT_APP_OLLAMA_MODEL,
      prompt: "Hello, how are you?",
      stream: false,
    }),
  }
);
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Testing Best Practices
- Use React Testing Library for component testing
- Test user interactions, not implementation details
- Mock external API calls
- Maintain 80%+ code coverage

## 📝 Markdown Rendering

The application uses `react-markdown` for safe rendering:
```javascript
import ReactMarkdown from 'react-markdown';

<ReactMarkdown
  className="prose prose-sm"
  components={{
    code: ({ inline, className, children }) => (
      inline ? 
        <code className="bg-gray-100 px-1 rounded">{children}</code> :
        <pre className="bg-gray-800 text-white p-4 rounded"><code>{children}</code></pre>
    ),
  }}
>
  {markdownContent}
</ReactMarkdown>
```

## 🚢 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'build' folder to Netlify
```

### Docker Deployment
```dockerfile
FROM node:19-alpine
WORKDIR /app
COPY my-react-app/package*.json ./
RUN npm install
COPY my-react-app/ ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We greatly appreciate contributions! Here's how to contribute:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing coding style
- Add tests for new features
- Update documentation
- Follow commit message conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Iman Mukhlisin**
- GitHub: [@imanmukhlisin](https://github.com/imanmukhlisin)
- Repository: [Model-AI-Ollama](https://github.com/imanmukhlisin/Model-AI-Ollama)

## 📞 Support & Feedback

If you have any questions or suggestions, please:
- Open a [GitHub Issue](https://github.com/imanmukhlisin/Model-AI-Ollama/issues)
- Submit a pull request with improvements
- Start a discussion in [GitHub Discussions](https://github.com/imanmukhlisin/Model-AI-Ollama/discussions)

## 🙏 Acknowledgments

- Thanks to the React and Tailwind CSS community
- Hugging Face for models and inference API
- Ollama for the amazing local model platform
- All contributors who have helped with this project

---

**⭐ If this project helps you, please don't forget to give it a star!**

Made with ❤️ by [Iman Mukhlisin](https://github.com/imanmukhlisin)
