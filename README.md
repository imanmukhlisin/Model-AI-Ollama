# 🤖 Model-AI-Ollama

> Aplikasi Web Modern untuk Interaksi dengan Model AI Ollama dan Hugging Face

![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-66.6%25-yellow?logo=javascript&logoColor=white)
![Python](https://img.shields.io/badge/Python-22.9%25-green?logo=python&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Project](#-struktur-project)
- [Konfigurasi](#-konfigurasi)
- [Kontribusi](#-kontribusi)

## ✨ Fitur Utama

### 🎯 Integrasi AI Canggih
- **Model Ollama**: Dukung model lokal dengan Ollama
- **Hugging Face Inference**: Integrasi dengan model-model terkemuka dari Hugging Face
- **Markdown Rendering**: Tampilkan output AI dengan formatting markdown yang elegan
- **Chat Interface**: Interface percakapan yang responsif dan user-friendly

### 📂 Pemrosesan File
- **Upload Dokumen**: Dukung berbagai format file
- **CSV Parser**: Parse file CSV dengan PapaParse
- **Word Documents**: Ekstrak teks dari file Word menggunakan Mammoth
- **Auto-resize Textarea**: Text input yang secara otomatis menyesuaikan ukuran

### 🎨 UI/UX Modern
- **Tailwind CSS**: Styling modern dengan utility-first approach
- **Responsive Design**: Bekerja sempurna di desktop, tablet, dan mobile
- **Typography Plugin**: Plugin Tailwind untuk typography profesional
- **Smooth Interactions**: Animasi dan transisi yang halus

### 🧪 Testing & Quality
- **React Testing Library**: Testing utilities yang comprehensive
- **Jest Integration**: Unit test dan integration test
- **Web Vitals**: Monitoring performa aplikasi

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library modern
- **React DOM 19.2.0** - React renderer untuk web
- **Tailwind CSS 3.4.18** - Styling utility-first
- **@tailwindcss/typography 0.5.19** - Plugin typography
- **React Markdown 10.1.0** - Render markdown secara aman

### AI & ML
- **@huggingface/inference 4.11.3** - SDK Hugging Face
- **Ollama** - Model AI lokal

### File Processing
- **Mammoth 1.11.0** - Parse Word documents
- **PapaParse 5.5.3** - CSV parser
- **resolve-url-loader 5.0.0** - URL resolution loader

### Development
- **React Scripts 5.0.1** - Create React App scripts
- **PostCSS 8.5.6** - CSS transformation
- **Autoprefixer 10.4.21** - Browser prefix automation

### Testing
- **@testing-library/react 16.3.0** - React testing utils
- **@testing-library/jest-dom 6.9.1** - Jest matchers
- **@testing-library/user-event 13.5.0** - User interaction simulation

## 🚀 Instalasi

### Prerequisites
- Node.js 16+ dan npm/yarn
- Python 3.8+ (untuk backend yang sesuai)
- Ollama (opsional, untuk model lokal)

### Langkah-langkah

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
Buat file `.env.local` di direktori `my-react-app`:
```env
# Hugging Face API
REACT_APP_HF_TOKEN=your_hugging_face_token

# Ollama Configuration (jika menggunakan)
REACT_APP_OLLAMA_BASE_URL=http://localhost:11434
REACT_APP_OLLAMA_MODEL=llama2
```

4. **Jalankan Development Server**
```bash
npm start
```
Aplikasi akan membuka di `http://localhost:3000`

## 💻 Penggunaan

### Chatting dengan AI
1. Ketik pesan Anda di textarea
2. Pilih model AI (Ollama atau Hugging Face)
3. Klik tombol "Send" atau tekan Ctrl+Enter
4. Lihat respons yang ter-render dengan markdown

### Upload & Process File
1. Klik tombol "Upload File"
2. Pilih file (CSV, Word, atau text)
3. Sistem akan memproses file secara otomatis
4. Hasil akan ditampilkan di chat interface

### Kustomisasi Model
1. Buka settings
2. Pilih model yang ingin digunakan
3. Sesuaikan parameter seperti temperature, max_tokens
4. Simpan konfigurasi

## 📁 Struktur Project

```
Model-AI-Ollama/
├── my-react-app/              # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── utils/            # Utility functions
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

## ⚙️ Konfigurasi

### Tailwind CSS
File konfigurasi: `my-react-app/tailwind.config.js`
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
Development dan production build dikonfigurasi melalui `package.json`:
```bash
npm start      # Development server
npm build      # Production build
npm test       # Run tests
```

## 🔧 API Integration

### Hugging Face Integration
```javascript
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.REACT_APP_HF_TOKEN);

const response = await hf.textGeneration({
  model: "gpt2",
  inputs: "Halo, apa kabar?",
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
      prompt: "Halo, apa kabar?",
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

### Run Tests dengan Coverage
```bash
npm test -- --coverage
```

### Testing Best Practices
- Gunakan React Testing Library untuk component testing
- Test user interactions, bukan implementation details
- Mock external API calls
- Maintain 80%+ code coverage

## 📝 Markdown Rendering

Aplikasi menggunakan `react-markdown` untuk rendering aman:
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

### Deploy ke Vercel
```bash
npm install -g vercel
vercel
```

### Deploy ke Netlify
```bash
npm run build
# Drag and drop folder 'build' ke Netlify
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

## 🤝 Kontribusi

Kontribusi sangat kami hargai! Berikut cara berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

### Development Guidelines
- Ikuti coding style yang ada
- Tambahkan tests untuk fitur baru
- Update documentation
- Follow commit message convention

## 📄 Lisensi

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👨‍💻 Author

**Iman Mukhlisin**
- GitHub: [@imanmukhlisin](https://github.com/imanmukhlisin)
- Repository: [Model-AI-Ollama](https://github.com/imanmukhlisin/Model-AI-Ollama)

## 📞 Support & Feedback

Jika Anda memiliki pertanyaan atau saran, silakan:
- Buka [GitHub Issues](https://github.com/imanmukhlisin/Model-AI-Ollama/issues)
- Kirim pull request dengan improvement
- Diskusikan di GitHub Discussions

## 🙏 Acknowledgments

- Terima kasih kepada komunitas React dan Tailwind CSS
- Hugging Face untuk model dan inference API
- Ollama untuk platform model lokal yang amazing
- Semua contributors yang telah membantu project ini

---

**⭐ Jika project ini membantu Anda, jangan lupa beri bintang!**

Dibuat dengan ❤️ oleh [Iman Mukhlisin](https://github.com/imanmukhlisin)
