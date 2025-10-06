# Pool Live Plus - Game Project

## Overview
Pool Live Plus is a multiplayer pool game built with HTML5, JavaScript, and Socket.IO for real-time gameplay. The game features Google authentication via Firebase and supports both web and desktop (Electron) platforms.

## Project Structure
- **geewa.html** - Main entry point with Firebase authentication and login interface
- **auth.js** - Custom Firebase authentication module with Google OAuth
- **game.html** - Original game interface (now loaded after authentication)
- **game.js** - Obfuscated game logic (loads dynamically after successful login)
- **server.js** - Simple Node.js HTTP server serving static files on port 5000
- **lib/** - External libraries (Socket.IO, Firebase, country detection)
- **assets/** - Game assets (fonts, images, binary game data)

## Tech Stack
- **Frontend**: HTML5, JavaScript (ES6+), CSS3
- **Real-time Communication**: Socket.IO v4.8.1
- **Authentication**: Firebase v7.22.0
- **Server**: Node.js HTTP server
- **Optional Desktop**: Electron support via preload.js

## Development Setup
The project runs on a simple Node.js HTTP server that serves static files. The server:
- Listens on `0.0.0.0:5000`
- Serves geewa.html as the default index (authentication page)
- Includes proper cache-control headers to prevent caching issues
- Supports all static assets (HTML, JS, CSS, images, fonts, binary files)

## Authentication Flow
1. User lands on geewa.html with welcome message and "Sign in with Google" button
2. Authentication initializes on first interaction (mousemove for desktop, touchstart for mobile)
3. Fallback timeout (5.5s) ensures auth initializes even without user interaction
4. After successful Google sign-in, session is stored in localStorage (5-day expiration)
5. Game loads automatically for users with valid sessions
6. Desktop download blocker removed for seamless web access

## Deployment
Configured for Replit autoscale deployment:
- Runs on port 5000
- Stateless web application
- No backend required (uses external Firebase/Socket.IO services)

## Key Features
- Multi-language support (Arabic, English, French)
- Orientation detection for mobile devices
- Anti-bot protection (game loads on user interaction)
- Session management with localStorage
- Tab duplication detection
- Auto-update system for Electron app

## Recent Changes (2025-10-06)
- **Completed Firebase Authentication Integration**:
  - Added auth.js module with Firebase Google OAuth support
  - Implemented geewa.html as main login/game page with multi-language support
  - Updated server.js to serve geewa.html as default entry point
  - Removed desktop download blocker for web access
  - Fixed button visibility issues by making login button visible by default
  - Added duplicate handler prevention for authentication initialization
  - Implemented multi-platform support (mousemove, touchstart, timeout fallback)
  - Session management with localStorage (5-day expiration)
- Created Node.js HTTP server (server.js) to serve static files
- Configured workflow to run on port 5000
- Configured deployment settings for autoscale
