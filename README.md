# Portfolio Website

A modern, premium portfolio website with integrated Discord and Spotify API support. Built with Node.js, Express, and EJS for a seamless experience.

## Features

- 🎨 **Modern Design** - Clean, responsive layout with smooth animations
- 🌓 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 🎵 **Spotify Integration** - Display your recently played tracks
- 💬 **Discord Status** - Show your Discord presence (optional)
- ⚡ **Fast & Lightweight** - Optimized performance and minimal dependencies
- 🎯 **Fully Customizable** - Easy configuration via config.js
- 📱 **Responsive** - Works seamlessly on all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Spotify Developer Account (for music integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NoctarioN/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup configuration**
   - Copy `config.example.js` to `config.js`
   - Open `config.js` and customize all settings
   - Add your personal information, projects, and skills
   - Configure your Spotify API credentials

4. **Get Spotify Credentials**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Get your `Client ID` and `Client Secret`
   - Generate a refresh token
   - Add these to your `config.js`

5. **Start the server**
   ```bash
   npm start
   ```
   The website will be available at `http://localhost:3000`

## Configuration

Edit `config.js` to customize your portfolio with your personal information, projects, skills, and Spotify integration settings.

## License

This project is open source and available for personal use.

---

**Made with ❤️ by [NoctarioN](https://github.com/NoctarioN/portfolio)**
