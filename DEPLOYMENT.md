# Pool Live Plus - Production Deployment Guide

## Version 2 - Production Ready

This project is configured for deployment on Vercel with Next.js as the hosting framework.

## Project Structure

\`\`\`
/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Entry point (redirects to geewa.html)
│   └── layout.tsx         # Root layout
├── public/                # Static assets served at root
│   ├── geewa.html        # Main game entry point
│   ├── auth.js           # Firebase authentication
│   ├── game.js           # Game logic (obfuscated)
│   ├── assets/           # Game assets
│   └── lib/              # Libraries (Firebase, etc.)
├── vercel.json           # Vercel deployment configuration
└── next.config.mjs       # Next.js configuration
\`\`\`

## Deployment Steps

### 1. Deploy to Vercel

**Option A: Using Vercel CLI**
\`\`\`bash
npm install -g vercel
vercel login
vercel --prod
\`\`\`

**Option B: Using GitHub Integration**
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel will auto-deploy on push

**Option C: Using v0 Interface**
1. Click "Publish" button in top right
2. Follow deployment wizard
3. Game will be live in seconds

### 2. Environment Variables

No environment variables are required for basic deployment. Firebase configuration is embedded in the code.

### 3. Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## How It Works

1. **Entry Point**: User visits root URL (/)
2. **Redirect**: Next.js redirects to /geewa.html
3. **Authentication**: Firebase Google OAuth login
4. **Game Load**: After auth, game.js loads dynamically
5. **Session**: User session persists for 5 days

## Configuration Files

### vercel.json
- Rewrites root to geewa.html
- Sets cache headers for static assets
- Disables cache for game files (for updates)

### next.config.mjs
- Configures Next.js for static serving
- Adds CORS headers
- Optimizes images

## Testing Locally

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 - should redirect to geewa.html

## Production URLs

After deployment, your game will be available at:
- Vercel URL: `https://your-project.vercel.app`
- Custom domain: `https://yourdomain.com` (if configured)

## Updating the Game

To deploy updates:
1. Make changes to game files
2. Commit and push to repository
3. Vercel auto-deploys (or run `vercel --prod`)

## Cache Strategy

- **Static assets** (images, fonts): Cached for 1 year
- **Game files** (game.js, auth.js): No cache (always fresh)
- **HTML files**: No cache (always fresh)

## Troubleshooting

**Issue**: Game doesn't load
- Check browser console for errors
- Verify all files are in public/ folder
- Check Firebase configuration

**Issue**: Authentication fails
- Verify Firebase project is active
- Check Firebase console for errors
- Ensure domain is whitelisted in Firebase

**Issue**: Assets not loading
- Check file paths in geewa.html
- Verify files exist in public/ folder
- Check browser network tab

## Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- v0 Support: https://vercel.com/help

## Version History

- **V2**: Production-ready with Next.js + Vercel
- **V1**: Original with custom Node.js server
