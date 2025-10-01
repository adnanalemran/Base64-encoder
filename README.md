# Base64 Encoder & NPM Token Manager

A React-based web application for Base64 encoding operations with NPM authentication setup and token management.

## 📋 Description

Created by **Adnan Al-Emran**, this project provides a modern React UI for Base64 encoding/decoding functionality along with NPM authentication configuration utilities and token management.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- NPM

### Installation

1. Clone the repository:

```bash
git clone https://github.com/adnanalemran/Base64-encoder.git
cd Base64-encoder
```

1. Install dependencies:

```bash
npm install
```

### Configuration

The project includes NPM authentication setup. Make sure to configure your `.npmrc` file with the appropriate registry settings.

## 📜 Available Scripts

### Development Scripts
- **`npm run dev`** - Start the React development server
- **`npm run build`** - Build the React app for production
- **`npm run preview`** - Preview the production build
- **`npm start`** - Alias for `npm run dev`

### Authentication Scripts
- **`npm run set`** - Runs the NPM authentication setup script
- **`npm run test`** - Runs the authentication test script

## 🛠️ Usage

### Development Server

```bash
npm run dev
```

This will start the React development server at `http://localhost:3000`

### Setting up NPM Authentication (CLI)

```bash
npm run set
```

### Testing Authentication (CLI)

```bash
npm run test
```

## 🎨 React UI Features

### 🔄 Base64 Encoder/Decoder
- **Encode Text**: Convert plain text to Base64 format
- **Decode Base64**: Convert Base64 strings back to readable text
- **Copy to Clipboard**: Easy copying of results
- **Mode Toggle**: Switch between encode and decode modes
- **Real-time Processing**: Instant encoding/decoding

### 🔑 NPM Token Manager
- **Token Testing**: Test NPM authentication tokens
- **Token Storage**: Save and manage multiple tokens locally
- **Registry Configuration**: Support for custom NPM registries
- **Generate .npmrc**: Create NPM configuration files
- **Download/Copy**: Export configurations for use

## 📁 Project Structure

```text
Base64-encoder/
├── public/
├── src/
│   ├── components/
│   │   ├── Base64Encoder.jsx    # Base64 encoding/decoding component
│   │   └── TokenManager.jsx     # NPM token management component
│   ├── App.jsx                  # Main React application
│   ├── App.css                  # Application styles
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── scripts/
│   ├── set-npm-auth.js          # NPM authentication setup script
│   └── test-auth.js             # NPM authentication test script
├── .gitignore                   # Git ignore configuration
├── .npmrc                       # NPM registry configuration
├── index.html                   # HTML template
├── package.json                 # Project metadata and dependencies
├── package-lock.json            # Dependency lock file
├── vite.config.js               # Vite configuration
└── README.md                    # Project documentation
```

## 🔐 Security

- Environment files (`.env*`) are excluded from version control
- Only essential configuration files are tracked in git
- NPM authentication scripts are kept local for security

## 📦 Dependencies

### Runtime Dependencies
- **react**: ^18.2.0 - React library for building user interfaces
- **react-dom**: ^18.2.0 - React DOM rendering
- **dotenv**: ^17.2.3 - Environment variable management
- **axios**: ^1.6.0 - HTTP client for API requests

### Development Dependencies
- **@vitejs/plugin-react**: ^4.2.1 - Vite React plugin
- **vite**: ^5.0.8 - Next generation frontend tooling
- **@types/react**: ^18.2.43 - TypeScript definitions for React
- **@types/react-dom**: ^18.2.17 - TypeScript definitions for React DOM

## 👨‍💻 Author

Adnan Al-Emran

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on the GitHub repository.

---

*This project focuses on maintaining clean git history by only tracking essential configuration files.*
