## 🌌 Gemini-Infinite-World-Generator

## 🚀 Celebrating Repository #100!
This repository marks a major milestone: **my 100th GitHub repository!** To celebrate a century of code, I am building on the bleeding edge of AI technology using the state-of-the-art **Gemini 4 Argon** model to achieve something that was previously impossible.

## 🧠 The Concept
Traditional Large Language Models (LLMs) break down when tasked with coding complex, full-scale 3D games or environments because of tight output token constraints (usually cutting off after 4K to 64K tokens). 

**Gemini 4 Argon changes the game with its unified 1M token window and massive long-decode capabilities.** 

`Gemini-Infinite-World-Generator` is an automation tool that instructs Gemini 4 Argon to write entire, highly detailed interactive 3D worlds and physics-based games using **Three.js and WebGL** inside a **single continuous generation**—without splitting files, losing structural coherence, or breaking the output stream halfway through.

## ✨ Key Features
- **Long-Horizon Engineering:** Prompts designed specifically for Argon's deep reasoning mode to plan 3D assets, lighting, and camera physics before writing code.
- **Zero-Truncation Pipeline:** Leverages Argon's *long decode* capability to output massive, production-ready vanilla JavaScript/Three.js logic exceeding hundreds of thousands of tokens.
- **Infinite Variety:** Feed it a simple premise (e.g., *"A cyberpunk rain-slicked neon street with moving flying vehicles and collision mechanics"*), and watch it output a fully functioning, self-contained single-file 3D environment.

## 🛠️ Tech Stack & Requirements
- **LLM Engine:** Google AI Studio (Gemini 4 Argon API Key required)
- **Frontend Core:** [Three.js](https://threejs.org) via unpkg CDN
- **Backend Runner:** Node.js (ES Modules)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd gemini-infinite-world-generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API Key:**
   Create a `.env` file in the root directory and add your Google AI Studio key securely:
   ```env
   GEMINI_API_KEY=your_gemini_4_argon_api_key_here
   ```
   *(Note: The `.env` file is automatically ignored by Git to keep your credentials safe).*

## 🎮 How to Generate a 3D World

Run the generator script from your terminal using the `--prompt` (or `-p`) and `--output` (or `-o`) flags:

```bash
node src/index.js --prompt "A synthwave style infinite driver game where the player dodges obstacles with retro cyber cars, complete with score tracking and neon particle rain" --output synthwave-driver
```

### 🌐 Running Your World
Once the pipeline finishes, navigate to the `examples/` folder and open the generated `.html` file directly in any modern web browser. No server setup required!

---
*Built with passion, curiosity, and 100 repositories worth of experience.* 🚀
