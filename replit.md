# Pool Live Plus - Game Project

## Overview
Pool Live Plus is a multiplayer pool game built with HTML5, JavaScript, and Socket.IO for real-time gameplay. The game features Google authentication via Firebase and supports both web and desktop (Electron) platforms.

## Project Structure
- **game.html** - Main game entry point with loading screen and login interface
- **game.js** - Obfuscated game logic (loads dynamically on user interaction)
- **google.html** - Google authentication handler using Firebase
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
- Serves game.html as the default index
- Includes proper cache-control headers to prevent caching issues
- Supports all static assets (HTML, JS, CSS, images, fonts, binary files)

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
- Created Node.js HTTP server (server.js) to serve static files
- Configured workflow to run on port 5000
- Added .gitignore for Node.js project
- Configured deployment settings for autoscale
- Successfully tested game loading and asset serving
